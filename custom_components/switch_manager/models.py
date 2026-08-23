import time
import re
import copy
from .const import DOMAIN, LOGGER
from .helpers import format_mqtt_message, get_val_from_str
from homeassistant.core import HomeAssistant, Context, callback, Event
from homeassistant.const import EVENT_STATE_CHANGED, STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.helpers import entity_registry as er, device_registry as dr
from homeassistant.helpers.script import Script, async_validate_actions_config, DEFAULT_SCRIPT_MODE
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

EVENT_ENTITY_DOMAIN = 'event'
EVENT_TYPE_EVENT_ENTITY = 'event_entity'

@callback
def _is_event_entity_state_change( data ) -> bool:
    return str(data.get('entity_id', '')).startswith(f"{EVENT_ENTITY_DOMAIN}.")

def format_event_entity_state( hass: HomeAssistant, event: Event ) -> dict | None:
    """Turn a state_changed event of an `event.*` entity into switch data.

    Matter (and other integrations such as Hue or Zigbee2MQTT) do not fire bus
    events for remotes; each button is an event entity whose state (a timestamp)
    changes on every press while `attributes.event_type` says what happened.
    Returns None for anything that is not a real button press (startup restore,
    unavailable, ...).
    """
    new_state = event.data.get('new_state')
    old_state = event.data.get('old_state')
    if new_state is None or old_state is None:
        return None
    if new_state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN) or old_state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
        return None
    if new_state.attributes.get('event_type') is None:
        return None

    entity_registry = er.async_get(hass)
    entry = entity_registry.async_get(new_state.entity_id)
    device_id = entry.device_id if entry else None

    # Matter remotes expose one event entity per button. Their unique ids carry the
    # endpoint number, so ordering the devices event entities by endpoint (falling
    # back to the unique id) gives a stable button index that survives the user
    # renaming the entities.
    entity_index = 0
    siblings = []
    if device_id:
        siblings = sorted(
            (e for e in er.async_entries_for_device(entity_registry, device_id, include_disabled_entities=True)
             if e.domain == EVENT_ENTITY_DOMAIN),
            key=lambda e: (matter_endpoint_from_unique_id(e.unique_id) is None,
                           matter_endpoint_from_unique_id(e.unique_id) or 0,
                           str(e.unique_id))
        )
        entity_index = next((i for i, e in enumerate(siblings) if e.entity_id == new_state.entity_id), 0)

    event_type = new_state.attributes.get('event_type')
    data = { k: v for k, v in new_state.attributes.items() if k != 'event_types' }
    data.update({
        'entity_id': new_state.entity_id,
        'state': new_state.state,
        'device_id': device_id,
        'unique_id': entry.unique_id if entry else None,
        'original_name': entry.original_name if entry else None,
        'platform': entry.platform if entry else None,
        'endpoint': matter_endpoint_from_unique_id(entry.unique_id) if entry else None,
        'entity_index': entity_index,
        'entity_count': len(siblings),
        'presses': presses_from_event(new_state.attributes),
        'attributes': dict(new_state.attributes),
    })
    return data

MATTER_ENDPOINT_RE = re.compile(r'-MatterNodeDevice-(\d+)-')

def matter_endpoint_from_unique_id( unique_id ) -> int | None:
    """Matter endpoint of a Home Assistant Matter entity, None for anything else.

    HA builds Matter unique ids as `{fabric}-{node}-MatterNodeDevice-{endpoint}-...`.
    """
    match = MATTER_ENDPOINT_RE.search(str(unique_id or ''))
    return int(match.group(1)) if match else None

def presses_from_event( attributes ) -> int:
    """Number of presses (or scroll notches) an event stands for, default 1.

    Matter batches fast scrolling / multi presses into one `multi_press_N` event and
    reports the count in `totalNumberOfPressesCounted`.
    """
    count = attributes.get('totalNumberOfPressesCounted')
    if isinstance(count, int) and not isinstance(count, bool) and count > 0:
        return count
    event_type = attributes.get('event_type')
    if isinstance(event_type, str) and event_type.startswith('multi_press_'):
        tail = event_type.rsplit('_', 1)[-1]
        if tail.isdigit():
            return max(1, int(tail))
    return 1

MAX_SCALE = 50

def _scale_number( value, factor ):
    """Multiply a numeric (or numeric string) value by factor, keeping its type.
    Templates and non numeric values are returned unchanged."""
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return type(value)(value * factor)
    if isinstance(value, str):
        text = value.strip()
        if '{{' in text or '{%' in text:
            return value
        try:
            return str(int(text) * factor) if '.' not in text else str(float(text) * factor)
        except ValueError:
            return value
    return value

def scale_sequence_fields( sequence, fields, factor ):
    """Deep copy a script sequence and multiply the given service data field(s) by
    factor wherever they appear under a steps `data` / `service_data`.

    Lets a blueprint scale e.g. `brightness_step_pct` by the scroll notch count so
    the users action stays a single template free step."""
    scaled = copy.deepcopy(sequence)

    def walk( node ):
        if isinstance(node, dict):
            for key, value in node.items():
                if key in ('data', 'service_data', 'event_data') and isinstance(value, dict):
                    for field in fields:
                        if field in value:
                            value[field] = _scale_number(value[field], factor)
                else:
                    walk(value)
        elif isinstance(node, list):
            for item in node:
                walk(item)

    walk(scaled)
    return scaled

def get_device_name( hass: HomeAssistant, device_id ) -> str | None:
    if not device_id:
        return None
    device = dr.async_get(hass).async_get(device_id)
    if not device:
        return None
    return device.name_by_user or device.name

async def create_event_listeners( hass: HomeAssistant, blueprint, mqtt_topic, _callback ):
    @callback
    def _handleMQTT( message: ReceiveMessage ):
        data = format_mqtt_message(message)
        _callback( data.copy(), Context() )
    
    @callback
    def _handleEvent( event ):
        _callback( event.data.copy(), event.context )

    @callback
    def _handleEntityEvent( event: Event ):
        data = format_event_entity_state( hass, event )
        if data is not None:
            _callback( data, event.context )

    listeners = []
    if blueprint.is_event_entity:
        listeners.append( hass.bus.async_listen(
            EVENT_STATE_CHANGED, _handleEntityEvent, event_filter=_is_event_entity_state_change
        ) )
    elif blueprint.is_mqtt:
        try:
            listeners.append( await mqtt_subscribe(hass, mqtt_topic, _handleMQTT) )
            if blueprint.mqtt_sub_topics:
                listeners.append( await mqtt_subscribe(hass, f"{mqtt_topic}/#", _handleMQTT) )
        except HomeAssistantError:
            LOGGER.error(f"Unable to handle switch as MQTT is not loaded")
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
        self.is_event_entity = self.event_type == EVENT_TYPE_EVENT_ENTITY
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
                    identifier = data.get('topic') if self.is_mqtt else data.get(self.identifier_key)
                    discovered = { "identifier": identifier }
                    if self.is_event_entity:
                        # A device id says nothing to a human, so hand the panel the
                        # device name as well for the discovery list.
                        discovered['name'] = get_device_name( self._hass, data.get('device_id') )
                    _callback( discovered )
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
        self.conditions = convert_conditions( hass, config.get('conditions', []) )
        self.index = index
        # Optional: multiply these service data field(s) by `data.presses` and run the
        # sequence once (relative values such as brightness steps) ...
        scale_field = config.get('scale_field')
        self.scale_field = [scale_field] if isinstance(scale_field, str) else scale_field
        # ... or run the whole sequence as often as the named data field says
        # (discrete actions such as "next track").
        self.repeat = config.get('repeat')

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

    async def _make_script( self, sequence ) -> Script:
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

    def scale_factor( self, data ) -> int:
        """How often this action should apply for the incoming event (1 = normal)."""
        if self.blueprint.scale_field:
            key = 'presses'
        elif self.blueprint.repeat:
            key = self.blueprint.repeat
        else:
            return 1
        try:
            factor = int(data.get(key, 1))
        except (TypeError, ValueError):
            factor = 1
        return min(max(1, factor), MAX_SCALE)

    async def run( self, data, context, factor: int = 1 ):
        if not self.script:
            LOGGER.debug(f'No sequence assigned for switch:{self.switch_id} button:{self.button_index} action:{self.index}')
            return

        if factor > 1 and self.blueprint.scale_field:
            # Run once with the fields multiplied: a fast scroll of N notches dims by
            # step * N in one call instead of N relative steps racing each other.
            try:
                script = await self._make_script(
                    scale_sequence_fields( self.sequence, self.blueprint.scale_field, factor )
                )
            except Exception as err:
                LOGGER.error(f"switch:{self.switch_id} button:{self.button_index} action:{self.index} could not build scaled sequence, running unscaled: {err}")
                script = self.script
            LOGGER.debug(f"Running sequence (x{factor} scaled) for switch:{self.switch_id} button:{self.button_index} action:{self.index}")
            try:
                await script.async_run( run_variables=data, context=context )
            finally:
                if script is not self.script and hasattr( script, 'async_unload' ):
                    await script.async_unload()
            return

        # Repeats run sequentially so per notch steps apply in order instead of racing.
        for _ in range(factor):
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

def blueprint_only_grew( blueprint, buttons_config ) -> bool:
    """Did the blueprint only gain buttons/actions compared to what is configured?

    Everything already configured then still sits at the same position, so filling in
    the new buttons and actions can never move a sequence onto a different action.
    """
    if len(buttons_config) > len(blueprint.buttons):
        return False
    return all(
        len(button.get('actions') or []) <= len(blueprint.buttons[index].actions)
        for index, button in enumerate(buttons_config)
    )

def reconcile_buttons_with_blueprint( blueprint, buttons_config ) -> list:
    """Reshape a switch config so its buttons line up with the blueprint again.

    Sequences are matched by index, buttons and actions the blueprint gained are added
    empty and the ones it no longer defines are dropped. This is what the editors "Fix"
    button ends up calling after an update changed the shape of a blueprint.
    """
    buttons = []
    for index, blueprint_button in enumerate(blueprint.buttons):
        button = dict(buttons_config[index]) if index < len(buttons_config) else {}
        actions = list(button.get('actions') or [])[:len(blueprint_button.actions)]
        while len(actions) < len(blueprint_button.actions):
            actions.append({ 'mode': DEFAULT_SCRIPT_MODE, 'sequence': [] })
        button['actions'] = actions
        buttons.append(button)
    return buttons

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
        self.buildButtons( self.setBlueprint( blueprint, config.get('buttons') ) )

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
            return buttons_config

        if not buttons_config:
            return buttons_config

        if blueprint_only_grew( self.blueprint, buttons_config ):
            # An update that only adds buttons or actions to a blueprint can be lined up
            # again without touching anything the user configured, so do that instead of
            # asking them to press "Fix" on every switch using it.
            return reconcile_buttons_with_blueprint( self.blueprint, buttons_config )

        if len(buttons_config) != len(self.blueprint.buttons):
            self._setError(f"Blueprint {self.blueprint.id} mismatch for buttons on {self.name}")
            self.is_mismatch = True
            return buttons_config

        for i in range(len(buttons_config)):
            if len(buttons_config[i].get('actions')) != len(self.blueprint.buttons[i].actions):
                self._setError(f"Blueprint {self.blueprint.id} mismatch for actions on {self.name}")
                self.is_mismatch = True
                return buttons_config

        return buttons_config

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
                    self._hass.async_create_task(
                        action.run( data={ "data": data }, context=context, factor=action.scale_factor( data ) )
                    )
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
                    # Script.async_unload() only exists from HA 2026.5 onwards; on older
                    # cores dropping the reference is all the teardown there is.
                    if hasattr( action.script, 'async_unload' ):
                        self._hass.async_create_task( action.script.async_unload() )
                    action.script = None
                    
    def setEnabled( self, value: bool ):
        self.enabled = value

    def _check_conditons( self, data ) -> bool:
        if not self.blueprint.is_mqtt:
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