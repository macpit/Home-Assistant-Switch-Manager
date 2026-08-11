import time
import re
import copy
from .const import DOMAIN, LOGGER
from .helpers import format_mqtt_message, format_state_event, get_val_from_str
from homeassistant.core import HomeAssistant, Context, callback
from homeassistant.const import EVENT_STATE_CHANGED
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.script import Script, async_validate_actions_config
from homeassistant.helpers.condition import async_template as template_condition
from homeassistant.helpers.template import Template
from homeassistant.components.mqtt.client import async_subscribe as mqtt_subscribe
from homeassistant.components.mqtt.models import ReceiveMessage
from homeassistant.exceptions import HomeAssistantError
import homeassistant.helpers.config_validation as cv

def check_conditions( hass: HomeAssistant, conditions, data ) -> bool:
    if not conditions:
        return True

    if isinstance(conditions, Template):
        return template_condition(hass, conditions, { "data": data }, False)
    for condition in conditions:
        value = get_val_from_str(condition.get('key'), data)
        if value is None or str(value) != str(condition.get('value')):
            return False
    return True

def convert_conditions( hass: HomeAssistant, conditions ):
    if isinstance(conditions, str):
        return Template(conditions, hass)
    return conditions

def _scale_number( value, factor ):
    """Multiply a numeric (or numeric-string) value by factor, preserving type.
    Templates and non-numeric values are returned unchanged."""
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return type(value)(value * factor)
    if isinstance(value, str):
        s = value.strip()
        if '{{' in s or '{%' in s:
            return value
        try:
            return str(int(s) * factor) if '.' not in s else str(float(s) * factor)
        except ValueError:
            return value
    return value

def scale_sequence_fields( sequence, fields, factor ):
    """Deep-copy a script sequence and multiply the given service-data field(s) by
    factor wherever they appear under a step's `data`/`service_data`. Lets a
    blueprint scale e.g. brightness_step_pct by the scroll notch count so the user's
    action stays a single, template-free step."""
    seq = copy.deepcopy(sequence)

    def walk( node ):
        if isinstance(node, dict):
            for key, value in node.items():
                if key in ('data', 'service_data') and isinstance(value, dict):
                    for field in fields:
                        if field in value:
                            value[field] = _scale_number(value[field], factor)
                else:
                    walk(value)
        elif isinstance(node, list):
            for item in node:
                walk(item)

    walk(seq)
    return seq

def _resolve_state_entities( hass: HomeAssistant, blueprint, identifier ):
    """Resolve the concrete entity_ids a state-entity switch should listen to.

    ``identifier`` is normally a Home Assistant device id (e.g. a Matter remote),
    in which case we return all of the device's entities in the blueprint's
    ``state_domain``. An entity_id may also be given directly for a single-entity
    switch.
    """
    if not identifier:
        return []
    if '.' in identifier:
        return [identifier]
    ent_reg = er.async_get(hass)
    return [
        entry.entity_id
        for entry in er.async_entries_for_device(ent_reg, identifier, include_disabled_entities=False)
        if entry.domain == blueprint.state_domain
    ]

async def create_event_listeners( hass: HomeAssistant, blueprint, identifier, _callback ):
    @callback
    def _handleMQTT( message: ReceiveMessage ):
        data = format_mqtt_message(message)
        _callback( data.copy(), Context() )

    @callback
    def _handleEvent( event ):
        _callback( event.data.copy(), event.context )

    @callback
    def _handleState( event ):
        data = format_state_event(hass, event, blueprint.state_domain)
        if data is None:
            return
        _callback( data, event.context )

    listeners = []
    if blueprint.is_mqtt:
        try:
            listeners.append( await mqtt_subscribe(hass, identifier, _handleMQTT) )
            if blueprint.mqtt_sub_topics:
                listeners.append( await mqtt_subscribe(hass, f"{identifier}/#", _handleMQTT) )
        except HomeAssistantError:
            LOGGER.error(f"Unable to handle switch as MQTT is not loaded")
    elif blueprint.is_state:
        if identifier:
            # Config path: scope the subscription to just this device's entities.
            # Never fall back to a global listener here - the per-event identifier
            # check is skipped for state switches, so a global listen would turn an
            # unresolved device into a catch-all for every event.* entity.
            entity_ids = _resolve_state_entities(hass, blueprint, identifier)
            if entity_ids:
                listeners.append( async_track_state_change_event(hass, entity_ids, _handleState) )
            else:
                LOGGER.warning(
                    f"No '{blueprint.state_domain}' entities found for identifier "
                    f"'{identifier}'; switch will not receive events until reloaded"
                )
        else:
            # Discovery path (no identifier): listen broadly and filter by domain
            # in the handler so any matching device can be discovered.
            listeners.append( hass.bus.async_listen(EVENT_STATE_CHANGED, _handleState) )
    else:
        listeners.append( hass.bus.async_listen(blueprint.event_type, _handleEvent) )
    return listeners

class Blueprint:
    
    def __init__(self, hass, _id: str, config: dict, has_image: bool):
        """Initialize Blueprint."""
        self._hass = hass
        self.id = str(_id)
        self.name = config.get('name')
        self.has_image = has_image
        self.service = config.get('service')
        self.event_type = config.get('event_type')
        self.is_mqtt = self.event_type == 'mqtt'
        self.is_state = self.event_type == 'state_changed'
        self.state_domain = config.get('state_domain', 'event')
        self.mqtt_topic_format = config.get('mqtt_topic_format', None)
        self.mqtt_sub_topics = config.get('mqtt_sub_topics', False)
        self.identifier_key = config.get('identifier_key')
        self.info = config.get('info')
        self.conditions = convert_conditions( hass, config.get('conditions', []) )

        self.buttons = [] # config.get('buttons')
        for i in range(len(config.get('buttons'))):
            self.buttons.append( BlueprintButton( hass, config.get('buttons')[i], i ) )

    def check_conditions( self, data ):
        if self.identifier_key and self.identifier_key not in data:
            return False
        return check_conditions( self._hass, self.conditions, data )

    async def start_discovery( self, _callback ):
        listeners = []
        @callback
        def remove_listener():
            for listener in listeners:
                listener()

        if self.is_mqtt and not self.mqtt_topic_format:
            return None

        # MQTT '+' is a single-level wildcard, so a device whose name contains
        # '/' (e.g. "Location on/off" -> zigbee2mqtt/Location on/off/action) adds
        # an extra topic level that 'zigbee2mqtt/+/action' can never match. For
        # discovery we therefore subscribe to a multi-level wildcard and match the
        # original pattern in Python, where '+' is allowed to span '/' too.
        subscribe_topic = self.mqtt_topic_format
        topic_matcher = None
        if self.is_mqtt and '+' in self.mqtt_topic_format:
            subscribe_topic = self.mqtt_topic_format.split('+', 1)[0] + '#'
            pattern = re.escape(self.mqtt_topic_format).replace(r'\+', r'.+')
            topic_matcher = re.compile('^' + pattern + '$')

        @callback
        def _processIncoming( data, context ):
            if topic_matcher and not topic_matcher.match( data.get('topic', '') ):
                return
            if not self.check_conditions(data):
                return

            for button in self.buttons:
                if not button.check_conditions( data ):
                    continue
                for action in button.actions:
                    if not action.check_conditions( data ):
                        continue
                    _callback( { "identifier": data.get('topic') if self.is_mqtt else data.get(self.identifier_key) } )
                    return

        listeners = await create_event_listeners( self._hass, self, subscribe_topic, _processIncoming )
        return remove_listener

    def from_dict(cls, data):
        return cls(**data)

    def as_dict(self):
        res = self.__dict__.copy()
        res.pop('_hass')
        if isinstance(self.conditions, Template):
            res['conditions'] = self.conditions.template
        return res

    def asdict(self):
        return self.as_dict()

class BlueprintButton:

    def __init__(self, hass, config: dict, index):
        """Initialize BlueprintButton."""
        self._hass = hass
        self.x = config.get('x')
        self.y = config.get('y')
        self.d = config.get('d')
        self.width = config.get('width')
        self.height = config.get('height')
        self.conditions = convert_conditions( hass, config.get('conditions', []) )
        self.index = index;

        self.actions = []
        for i in range(len(config.get('actions'))):
            self.actions.append( BlueprintButtonAction( hass, config.get('actions')[i], i ) )        

    def check_conditions( self, data ):
        return check_conditions( self._hass, self.conditions, data )

    def from_dict(cls, data):
        return cls(**data)

    def as_dict(self):
        res = self.__dict__.copy()
        res.pop('_hass')
        res.pop('index')
        if isinstance(self.conditions, Template):
            res['conditions'] = self.conditions.template
        return res

    def asdict(self):
        return self.as_dict()

class BlueprintButtonAction:

    def __init__(self, hass, config: dict, index):
        self._hass = hass
        self.title = config.get('title')
        self.repeat = config.get('repeat')
        scale_field = config.get('scale_field')
        self.scale_field = [scale_field] if isinstance(scale_field, str) else (scale_field or None)
        self.conditions = convert_conditions( hass, config.get('conditions', []) )
        self.index = index

    def check_conditions( self, data ):
        return check_conditions( self._hass, self.conditions, data )

    def from_dict(cls, data):
        return cls(**data)

    def as_dict(self):
        res = self.__dict__.copy()
        res.pop('_hass')
        res.pop('index')
        if isinstance(self.conditions, Template):
            res['conditions'] = self.conditions.template
        return res

    def asdict(self):
        return self.as_dict()

class ManagedSwitchConfigButtonAction:

    def __init__( self, hass: HomeAssistant, switch_id, button_index, index, blueprint_action, config ):
        """Initialize ManagedSwitchConfigButtonAction."""
        self._hass: HomeAssistant = hass
        
        self.switch_id = switch_id
        self.button_index = button_index
        self.index = index
        self.sequence = config.get('sequence')
        self.mode = config.get('mode')
        self.blueprint: BlueprintButtonAction = blueprint_action

        self.script: Script = None
        self.active = bool(self.sequence)
        hass.async_create_task( self.init_script() )

    def _check_conditions( self, data ) -> bool:
        return self.blueprint.check_conditions( data )

    async def _make_script( self, sequence ):
        validated = await async_validate_actions_config(
            self._hass, cv.SCRIPT_SCHEMA(sequence)
        )
        return Script(
                hass=self._hass,
                sequence=validated,
                name=f"{DOMAIN}_{self.switch_id}_{self.button_index}_{self.index}",
                domain=DOMAIN,
                logger=LOGGER,
                script_mode=self.mode
            )

    async def init_script( self ):
        if self.active:
            self.script = await self._make_script( self.sequence )

    async def run( self, data, context, repeat=1, scale=None ):
        if not self.script:
            LOGGER.debug(f'No sequence assigned for switch:{self.switch_id} button:{self.button_index} action:{self.index}')
            return

        # scale = (fields, factor): run ONCE with the named service-data field(s)
        # multiplied, so a fast scroll dims by (step * notches) in a single race-free
        # call instead of many relative steps. Built on the fly from the raw sequence.
        if scale and scale[1] != 1:
            fields, factor = scale
            try:
                script = await self._make_script( scale_sequence_fields(self.sequence, fields, factor) )
            except Exception as err:
                LOGGER.error(f"switch:{self.switch_id} could not build scaled sequence, running unscaled: {err}")
                script = self.script
            LOGGER.debug(f"Running scaled sequence (x{factor}) for switch:{self.switch_id} button:{self.button_index} action:{self.index}")
            await script.async_run( run_variables=data, context=context )
            return

        # Run sequentially so repeated steps (e.g. per scroll notch) apply in order
        # rather than racing. repeat is already clamped by the caller.
        for _ in range(max(1, repeat)):
            LOGGER.debug(f"Running sequence for switch:{self.switch_id} button:{self.button_index} action:{self.index} ")
            await self.script.async_run( run_variables=data, context=context )

    # home assistant json
    def as_dict(self):
        return {k: v for k, v in self.__dict__.items() if k in ['sequence', 'mode']}

    # attr dict
    def asdict(self):
        return self.as_dict()

class ManagedSwitchConfigButton:

    def __init__( self, hass: HomeAssistant, switch_id, index, blueprint_button, config ):
        """Initialize ManagedSwitchConfigButton."""
        self._hass: HomeAssistant = hass

        self.switch_id = switch_id
        self.index = index
        self.actions: list[ManagedSwitchConfigButtonAction] = []
        self.blueprint: BlueprintButton = blueprint_button

        self.active = False
        for i in range(len(config.get('actions'))):
            # Way to handle blueprint mismatch
            try:
                blueprint_action = self.blueprint.actions[i]
            except IndexError:
                blueprint_action = BlueprintButtonAction(hass, { 'mode': 'single', 'sequence': [] }, i)

            action = ManagedSwitchConfigButtonAction( 
                        hass,
                        switch_id,
                        index,
                        i,
                        blueprint_action, 
                        config.get('actions')[i] 
                    )
            self.actions.append(action)
            if action.active:
                self.active = True

    def setInactive( self ):
        self.active = False
        for action in self.actions:
            action.active = False
            action.script = None

    def _check_conditions( self, data ):
        return self.blueprint.check_conditions( data )

    # home assistant json
    def as_dict(self):
        return {k: v for k, v in self.__dict__.items() if k in ['actions']}

    # attr dict
    def asdict(self):
        return self.as_dict()

class ManagedSwitchConfig:

    # Allow the switch to be created so it can be deleted or fixed via GUI
    def __init__( self, hass: HomeAssistant, blueprint: Blueprint, _id, config ):
        """Initialize ManagedSwitch."""
        self._hass = hass
        self._event_listeners = []
        self._error = None
        self.id = str( _id ) # Ensute id is a string for future proofing
        self.name = config.get('name')        
        self.identifier = config.get('identifier')
        self.blueprint: Blueprint
        self.valid_blueprint: bool
        self.is_mismatch: bool
        self.variables: dict = config.get('variables')
        self.rotate: int = config.get('rotate', 0)
        self.buttons: list[ManagedSwitchConfigButton] = []
        self.enabled: bool = config.get('enabled', True)
        self.button_last_state: list = []
        self.setBlueprint( blueprint, config.get('buttons') )
        self.buildButtons( config.get('buttons') )

        self.listeners = []

    def update( self, config ):
        self.name = config.get('name')
        self.identifier = config.get('identifier')
        self.variables: dict = config.get('variables')
        self.rotate: int = config.get('rotate', 0)
        self.button_last_state = []
        self.buildButtons( config.get('buttons') )
        
    def setBlueprint( self, blueprint: Blueprint, buttons_config = None ):
        self.blueprint = blueprint
        self.valid_blueprint = type(blueprint) is Blueprint
        self.is_mismatch = False
        self._error = None

        if not self.valid_blueprint:
            self._setError(f"Blueprint {self.blueprint} for {self.name} not loaded, check logs")
            return

        if buttons_config:
            if len(buttons_config) != len(self.blueprint.buttons):
                self._setError(f"Blueprint {self.blueprint.id} mismatch for buttons on {self.name}")
                self.is_mismatch = True
                return
            for i in range(len(buttons_config)):
                if len(buttons_config[i].get('actions')) != len(self.blueprint.buttons[i].actions):
                    self._setError(f"Blueprint {self.blueprint.id} mismatch for actions on {self.name}")
                    self.is_mismatch = True
                    return

    def mergeVariables( self, data ):
        if not self.variables:
            self.variables = data
        else:
            self.variables.update(data)

    def buildButtons( self, buttons_config ):
        # Existing scripts are about to be replaced by freshly built ones, so fully
        # unload (not just stop) the old ones to release their resources.
        self.unload_scripts()
        self.buttons = []
        # No blueprint was loaded and is a string
        if not self.valid_blueprint:
            return

        for i in range(len(buttons_config)):
            # Way to handle blueprint mismatch
            try:
                blueprint_button = self.blueprint.buttons[i]
            except IndexError:
                blueprint_button = BlueprintButton(self._hass, { 'actions': [] }, i)

            self.buttons.append(
                    ManagedSwitchConfigButton( self._hass, self.id, i, blueprint_button, buttons_config[i] )
                )
            if self.is_mismatch:
                self.buttons[i].setInactive()
            self.button_last_state.append(None)
    
    def add_listener(self, callback):
        self.listeners.append(callback)

        def remove_listener():
            self.listeners.remove(callback)

        return remove_listener
        
    def notify(self, event: str, data):
        for listener in self.listeners:
            listener( {**data, **{"event": event}} )

    def monitored( self ) -> bool:
        return bool(self.listeners)

    async def start(self): 
        # Reset state for new instances as this should also be called as a restart
        self.stop()
        if self._event_listeners or self._error or not self.enabled:
            return

        def _processIncoming( data, context ):

            data.update({'variables': self.variables, 'switch_id': self.id, 'button_last_state': self.button_last_state.copy(), 'timestamp': time.time() })
            if not self.enabled or not self._check_conditons( data ):
                return

            button_index = -1
            for button in self.buttons:
                button_index += 1
                if not button._check_conditions( data ):
                    continue
                action_index = -1
                for action in button.actions:
                    action_index += 1
                    if not action._check_conditions( data ):
                        continue
                    # A blueprint action may either scale a numeric service-data
                    # field by the notch count (one race-free call) or repeat its
                    # whole sequence N times. Either way the user's action stays a
                    # single, template-free step.
                    repeat_count = 1
                    scale = None
                    if action.blueprint.scale_field:
                        try:
                            factor = int(data.get('presses', 1))
                        except (TypeError, ValueError):
                            factor = 1
                        scale = (action.blueprint.scale_field, min(max(1, factor), 50))
                    elif action.blueprint.repeat:
                        try:
                            repeat_count = int(data.get(action.blueprint.repeat, 1))
                        except (TypeError, ValueError):
                            repeat_count = 1
                        repeat_count = min(max(1, repeat_count), 50)
                    self._hass.async_create_task( action.run( data={ "data": data }, context=context, repeat=repeat_count, scale=scale ) )
                    self.button_last_state[button_index] = {
                        "action": action_index,
                        "title": action.blueprint.title,
                        "timestamp": data['timestamp']
                    }
                    self.notify('action_triggered', { 'button': button_index, 'action': action_index, 'data': data })

        self._event_listeners = await create_event_listeners( self._hass, self.blueprint, self.identifier, _processIncoming )

    def stop(self):
        # Restart-safe teardown: cancel in-flight runs but keep Script objects reusable
        # (start() calls stop() to restart, e.g. after setEnabled()).
        self._remove_event_listeners()
        self.stop_running_scripts()

    def unload(self):
        # Discard teardown: remove listeners and fully unload Scripts to release their
        # resources (cached conditions/sub-scripts). Use when the config is removed or
        # reloaded, never as a restart. As of HA 2026.5, Script.async_unload() must be
        # called when a script is no longer needed.
        self._remove_event_listeners()
        self.unload_scripts()

    def _remove_event_listeners( self ):
        if self._event_listeners:
            for listener in self._event_listeners:
                listener()
            self._event_listeners = []

    def stop_running_scripts( self ):
        for button in self.buttons:
            for action in button.actions:
                if action.script:
                    self._hass.async_create_task( action.script.async_stop() )

    def unload_scripts( self ):
        for button in self.buttons:
            for action in button.actions:
                if action.script:
                    self._hass.async_create_task( action.script.async_unload() )
                    action.script = None
                    
    def setEnabled( self, value: bool ):
        self.enabled = value

    def _check_conditons( self, data ) -> bool:
        # State-entity switches are already scoped to this device's entities at
        # subscription time, so no per-event identifier comparison is needed
        # (and the identifier is a device id, not present verbatim in the event).
        if not self.blueprint.is_mqtt and not self.blueprint.is_state:
            if str(data.get(self.blueprint.identifier_key)) != str(self.identifier):
                return False

        self.notify('incoming', { 'data': data })
        return self.blueprint.check_conditions( data )

    def _setError( self, error_message ):
        self._error = error_message
        if self._error:
            LOGGER.error(self._error)

    # home assistant json
    def as_dict(self):
        res = self.__dict__.copy()
        res.pop('_hass')
        res.pop('_event_listeners')
        res.pop('listeners')
        return res

    # attr dict
    def asdict(self):
        return self.as_dict()