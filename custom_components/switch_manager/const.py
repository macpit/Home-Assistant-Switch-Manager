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

LOGGER = logging.getLogger(__name__)