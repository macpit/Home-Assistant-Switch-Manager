import voluptuous as vol
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.script import SCRIPT_MODE_CHOICES, DEFAULT_SCRIPT_MODE
from .const import LOOP_INTERVAL_DEFAULT, LOOP_INTERVAL_MIN, LOOP_INTERVAL_MAX

CONDITION_SCHEMA = vol.Schema({
    vol.Required('key'): cv.string,
    vol.Required('value'): cv.string,
})
BLUEPRINT_ACTION_SCHEMA = vol.Schema({
    vol.Required('title'): cv.string,
    vol.Optional('conditions', default=[]): vol.Any(cv.string, [CONDITION_SCHEMA]),
    # Service data field(s) multiplied by the events press / notch count
    # (`data.presses`) before the sequence runs once, e.g. `brightness_step_pct`
    # for a scroll wheel. Keeps the users action a plain template free step.
    vol.Optional('scale_field'): vol.Any(cv.string, [cv.string]),
    # Name of a numeric data field used as repeat count for the whole sequence
    # (`presses` runs a discrete action once per notch). Alternative to scale_field.
    vol.Optional('repeat'): cv.string,
    # Title of the action (same button) whose event ends a "loop until release" run
    # of this action. Derived by convention (`hold` -> `hold (released)` / `released`)
    # when omitted; set it explicitly for blueprints that name things differently.
    vol.Optional('released_by'): cv.string,
})
SHAPE_CIRCLE_SCHEMA = vol.Schema({
    vol.Required('x'): cv.positive_int,
    vol.Required('y'): cv.positive_int,
    vol.Required('width'): cv.positive_int  
})
SHAPE_RECT_SCHEMA = SHAPE_CIRCLE_SCHEMA.extend({
    vol.Required('height'): cv.positive_int
})
SHAPE_PATH_SCHEMA = vol.Schema({
    vol.Required('d'): cv.string
})

BLUEPRINT_BUTTON_SCHEMA = vol.Schema({
    vol.Required('actions'): vol.All(cv.ensure_list, [BLUEPRINT_ACTION_SCHEMA]),
    vol.Optional('conditions', default=[]): vol.Any(cv.string, [CONDITION_SCHEMA]),

    vol.Optional('x'): cv.positive_int,
    vol.Optional('y'): cv.positive_int,
    vol.Optional('width'): cv.positive_int,
    vol.Optional('height'): cv.positive_int,
    vol.Optional('d'): cv.string,
})
BLUEPRINT_SCHEMA = vol.Schema({
    vol.Required('name'): cv.string,
    vol.Required('service'): cv.string,
    vol.Required('event_type'): cv.string,
    vol.Required('buttons'): vol.All(cv.ensure_list, [BLUEPRINT_BUTTON_SCHEMA]),
    vol.Optional('conditions', default=[]): vol.Any(cv.string, [CONDITION_SCHEMA]),
    vol.Optional('info'): cv.string
})
BLUEPRINT_EVENT_SCHEMA = BLUEPRINT_SCHEMA.extend({
    vol.Required('identifier_key'): cv.string
})
BLUEPRINT_MQTT_SCHEMA = BLUEPRINT_SCHEMA.extend({
    vol.Optional('mqtt_topic_format'): cv.string,
    vol.Optional('mqtt_sub_topics', default=False): cv.boolean
})
def _normalize_config_action(value):
    """Normalize raw HA action dicts into {mode, sequence} wrapper."""
    if isinstance(value, dict) and 'sequence' not in value and ('action' in value or 'service' in value):
        return {'mode': DEFAULT_SCRIPT_MODE, 'sequence': [value]}
    return value

SWITCH_MANAGER_CONFIG_ACTION_SCHEMA = vol.All(
    _normalize_config_action,
    vol.Schema({
        vol.Required('mode', default=DEFAULT_SCRIPT_MODE): vol.In(SCRIPT_MODE_CHOICES),
        vol.Required('sequence', default=[]): cv.ensure_list, # cv.SCRIPT_SCHEMA: This was causing problems and not parsing json format when action delay etc was used
        # Re-run the sequence until the blueprints release action fires (only honoured
        # when the blueprint action has a release counterpart).
        vol.Optional('loop', default=False): cv.boolean,
        vol.Optional('loop_interval', default=LOOP_INTERVAL_DEFAULT): vol.All(
            vol.Coerce(int), vol.Range(min=LOOP_INTERVAL_MIN, max=LOOP_INTERVAL_MAX)
        ),
    })
)
SWITCH_MANAGER_CONFIG_BUTTON_SCHEMA = vol.Schema({
    vol.Required('actions'): vol.All(cv.ensure_list, [SWITCH_MANAGER_CONFIG_ACTION_SCHEMA])
})
SWITCH_MANAGER_CONFIG_SCHEMA = vol.Schema({
    vol.Required('id', default=None): vol.Any(str, int, None),
    vol.Required('name'): cv.string,
    vol.Required('enabled', default=True): bool,
    vol.Required('blueprint'): cv.string,
    vol.Required('identifier'): cv.string,
    vol.Optional('variables'): vol.Any(None, dict),
    vol.Required('buttons'): vol.All(cv.ensure_list, [SWITCH_MANAGER_CONFIG_BUTTON_SCHEMA])
}, extra=vol.ALLOW_EXTRA)

SERVICE_SET_VARIABLES_SCHEMA = vol.Schema({
    vol.Required('switch_id'): vol.Any(str, int),
    vol.Required('variables'): dict,
})