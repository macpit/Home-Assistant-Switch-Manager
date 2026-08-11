"""Helpers for switch_manager integration."""
import json, pathlib, os, shutil, enum
from homeassistant.core import HomeAssistant, Event
from homeassistant.helpers import entity_registry as er
from annotatedyaml.loader import load_yaml
from .const import (
    LOGGER, 
    DOMAIN, 
    BLUEPRINTS_FOLDER, 
    CONF_BLUEPRINTS,
    CONF_MANAGED_SWITCHES
)
from homeassistant.exceptions import HomeAssistantError
from homeassistant.components.mqtt.models import ReceiveMessage

COMPONENT_PATH = os.path.dirname(os.path.realpath(__file__))

with open( os.path.join( COMPONENT_PATH, 'manifest.json') ) as f:
    MANIFEST = json.load(f)
    
VERSION = MANIFEST['version']

async def check_blueprints_folder_exists( hass ):
    dest_folder = pathlib.Path(hass.config.path(BLUEPRINTS_FOLDER, DOMAIN))
    return os.path.exists( dest_folder )

async def deploy_blueprints( hass ):
    dest_folder = pathlib.Path(hass.config.path(BLUEPRINTS_FOLDER, DOMAIN))
    if not os.path.exists( dest_folder ):
        os.makedirs( dest_folder )
    
    component_blueprints_path = os.path.join( COMPONENT_PATH, 'blueprints' )
    files = await hass.loop.run_in_executor(
            None,
            os.listdir,
            component_blueprints_path
        )

    def doFiles():
        for file in files:
            if os.path.isfile( os.path.join( component_blueprints_path, file )):
                shutil.copy( 
                    os.path.join( component_blueprints_path, file ),
                    dest_folder
                )

    await hass.async_add_executor_job(doFiles)

def _find_yaml_files( folder ):
    """Recursively find blueprint YAML files, skipping hidden files/dirs.

    Replaces annotatedyaml.loader._find_files (a private API) so we no longer depend
    on a non-public symbol of a separately versioned package. Behaviour is preserved:
    recursive walk, sorted per directory, ignores dot-files/dot-dirs.
    """
    results = []
    for root, dirs, files in os.walk(folder, topdown=True):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for basename in sorted(files):
            if not basename.startswith('.') and basename.endswith('.yaml'):
                results.append(os.path.join(root, basename))
    return results

async def load_blueprints( hass ):
    folder = pathlib.Path(hass.config.path(BLUEPRINTS_FOLDER, DOMAIN))
    files = await hass.loop.run_in_executor(None, _find_yaml_files, folder)

    results = []
    def doFiles():
        for f in files:
            try:
                data = load_yaml(f)
            except HomeAssistantError as ex:
                LOGGER.error(str(ex))
                continue
            results.append({
                'id': os.path.splitext(os.path.basename(f))[0],
                'has_image': os.path.exists(
                    os.path.join(folder, os.path.splitext(os.path.basename(f))[0] + '.png')
                ),
                'data': data        
            })
    
    await hass.async_add_executor_job(doFiles)
    return results

def format_mqtt_message( message: ReceiveMessage):
    try:
        data = json.loads(message.payload)
    except ValueError as e:
        data = message.payload
        
    # Json.loads will parse int payloads so we make sure those are converted to payloads
    if not isinstance(data, dict):
        data = {
            "payload": data
        }

    data.update({
        'topic': message.topic,
        'topic_basename': message.topic.split('/')[-1]
    })
    return data

def matter_endpoint_from_unique_id( unique_id ):
    """Extract the Matter endpoint id from a Home Assistant Matter entity unique_id.

    HA builds Matter unique_ids as
    ``{fabric}-{node}-MatterNodeDevice-{endpoint}-{key}-{cluster}-{attribute}``
    (non-bridged devices). The endpoint is the token right after the
    ``-MatterNodeDevice-`` anchor. Returned as a string so it compares directly
    against blueprint condition values. Returns None if the format doesn't match
    (e.g. bridged devices or non-Matter entities), in which case blueprints can
    fall back to matching on ``entity_id``.
    """
    if not unique_id:
        return None
    marker = '-MatterNodeDevice-'
    idx = unique_id.find(marker)
    if idx == -1:
        return None
    token = unique_id[idx + len(marker):].split('-', 1)[0]
    return token if token.isdigit() else None

def format_state_event( hass: HomeAssistant, event: Event, domain: str = 'event' ):
    """Flatten a ``state_changed`` event for a state-entity switch into a data dict.

    Used for connection types (e.g. Matter) where a button press surfaces as a
    state change on an ``event.*`` entity rather than a dedicated bus event. The
    actual action lives in ``new_state.attributes.event_type``. Returns None for
    state changes that aren't a real, actionable trigger (wrong domain, entity
    added/removed, no event_type) so callers can simply skip them.
    """
    entity_id = event.data.get('entity_id')
    if not entity_id or entity_id.split('.', 1)[0] != domain:
        return None

    new_state = event.data.get('new_state')
    old_state = event.data.get('old_state')
    # Ignore entity add/restore (no previous state) to avoid firing on restart,
    # and removals (no new state).
    if new_state is None or old_state is None:
        return None

    event_type = new_state.attributes.get('event_type')
    if event_type is None:
        return None

    entry = er.async_get(hass).async_get(entity_id)

    data = {
        'entity_id': entity_id,
        'device_id': entry.device_id if entry else None,
        'endpoint': matter_endpoint_from_unique_id(entry.unique_id) if entry else None,
        'event_type': event_type,
        'state': new_state.state,
    }
    # Expose the remaining entity attributes for advanced conditions without
    # letting them clobber the derived keys above.
    for key, value in new_state.attributes.items():
        data.setdefault(key, value)
    return data

def get_val_from_str(_string, _dict):
    keys = _string.split('.')
    v = _dict
    for key in keys:
        try:
            if isinstance(v, list):
                index = int(key)
                if index < len(v):
                    v = v[index]
                    continue
                return None
            if not key in v:
                return None
            if hasattr(v[key], 'as_dict'):
                v = v[key].as_dict()
            else:
                v = v[key]
        except ValueError:
            return None
    if isinstance(v, enum.Enum):
        return v.value
    return v

def _get_blueprint( hass: HomeAssistant, id: str ):
    return hass.data[DOMAIN][CONF_BLUEPRINTS].get(id, id)

async def _set_switch_config( hass: HomeAssistant, config ):
    hass.data[DOMAIN][CONF_MANAGED_SWITCHES][config.id] = config
    await config.start();

def _get_switch_config( hass: HomeAssistant, _id: str ):
    return hass.data[DOMAIN][CONF_MANAGED_SWITCHES].get(_id)

async def _remove_switch_config( hass: HomeAssistant, _id: str ):
    hass.data[DOMAIN][CONF_MANAGED_SWITCHES][_id].unload()
    del hass.data[DOMAIN][CONF_MANAGED_SWITCHES][_id]