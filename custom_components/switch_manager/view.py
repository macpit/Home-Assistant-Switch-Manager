from .const import (
    DOMAIN, 
    CONF_BLUEPRINTS, 
    CONF_STATIC_PATHS, 
    BLUEPRINTS_FOLDER, 
    PANEL_URL, 
    PANEL_URL_PATH, 
    NAME
)
from .helpers import VERSION
from homeassistant.core import HomeAssistant
from homeassistant.components.frontend import async_register_built_in_panel, async_remove_panel
from homeassistant.components.http import StaticPathConfig

async def async_setup_view(hass: HomeAssistant):
    await _async_register_static_paths(hass, [
        StaticPathConfig(
            PANEL_URL, 
            hass.config.path("custom_components/switch_manager/assets/switch_manager_panel.js"), 
            True
        )
    ])
    await async_bind_blueprint_images(hass)

    # Setting the entry up again within the same run (reloading it, a retry after a
    # failed setup) must not blow up. A panel can't be updated in place and Home
    # Assistant raises "Overwriting panel" when one is already registered, so drop
    # ours first instead.
    async_remove_view(hass)

    async_register_built_in_panel(hass,
        component_name="custom",
        sidebar_title=NAME,
        sidebar_icon="mdi:light-switch-off",
        frontend_url_path=PANEL_URL_PATH,
        require_admin=True,
        config={
            "_panel_custom": {
                "name": "switch-manager-panel",
                "module_url": f"{PANEL_URL}?{VERSION}",
                "embed_iframe": False
            },
            "version": VERSION
        },
    )

def async_remove_view(hass: HomeAssistant):
    """Remove the panel so the entry can be set up again after being unloaded."""
    async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)

async def async_bind_blueprint_images(hass: HomeAssistant):
    blueprints = hass.data[DOMAIN].get(CONF_BLUEPRINTS)

    await _async_register_static_paths(hass, [
        StaticPathConfig(
            f'/assets/{DOMAIN}/{key}.png',
            hass.config.path(f"{BLUEPRINTS_FOLDER}/{DOMAIN}/{key}.png"),
            True
        )
        for key in blueprints if blueprints[key].has_image
    ])

async def _async_register_static_paths(hass: HomeAssistant, configs: list[StaticPathConfig]):
    """Register static paths, skipping the ones already served.

    Routes live for as long as the process does and there is no way to remove them
    again, so registering the same url path twice only shadows the previous route and
    leaks a resource - which used to happen on every reload and every setup of the
    config entry.
    """
    registered = hass.data[DOMAIN].setdefault(CONF_STATIC_PATHS, set())

    configs = [config for config in configs if config.url_path not in registered]
    if not configs:
        return

    await hass.http.async_register_static_paths(configs)
    registered.update(config.url_path for config in configs)
