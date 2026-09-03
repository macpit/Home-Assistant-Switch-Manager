import logging

DOMAIN = "switch_manager"
NAME = 'Switch Manager'

CONF_BLUEPRINTS = "blueprints"
CONF_SWITCH_CONFIGS = 'switch_configs'
CONF_MANAGED_SWITCHES = "managed_switches"
CONF_STORE = 'store'

PANEL_URL = "/switch_manager_panel.js"
PANEL_URL_PATH = "switch_manager"

CONF_STATIC_PATHS = 'static_paths'

BLUEPRINTS_FOLDER = 'blueprints'

# Loop-until-release: safety net for a lost release event, plus the bounds for the
# per action interval between two runs (milliseconds).
LOOP_MAX_SECONDS = 15
LOOP_INTERVAL_DEFAULT = 250
LOOP_INTERVAL_MIN = 50
LOOP_INTERVAL_MAX = 5000

LOGGER = logging.getLogger(__name__)
# Base topic Zigbee2MQTT ships with; blueprints use it in mqtt_topic_format.
# Discovery swaps it for the base topics of the instances actually running.
ZIGBEE2MQTT_DEFAULT_BASE_TOPIC = 'zigbee2mqtt'
