"""Helpers for switch_manager integration."""
import base64, binascii, json, pathlib, os, re, shutil, enum
import yaml
from homeassistant.core import HomeAssistant
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
PNG_SIGNATURE = b'\x89PNG\r\n\x1a\n'
BLUEPRINT_ID_PATTERN = re.compile(r'^[a-z0-9][a-z0-9_-]*$')
MAX_BLUEPRINT_IMAGE_WIDTH = 800
MAX_BLUEPRINT_IMAGE_HEIGHT = 500

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

def _component_blueprint_exists( blueprint_id: str ):
    component_blueprints_path = os.path.join( COMPONENT_PATH, 'blueprints' )
    return os.path.exists(os.path.join(component_blueprints_path, f"{blueprint_id}.yaml"))

def _decode_blueprint_png( image: str | None ):
    if not image:
        return None

    if image.startswith("data:"):
        header, sep, payload = image.partition(",")
        if not sep or "image/png" not in header:
            raise HomeAssistantError("Blueprint image must be a PNG data URL")
        image = payload

    try:
        data = base64.b64decode(image, validate=True)
    except (binascii.Error, ValueError) as ex:
        raise HomeAssistantError("Blueprint image is not valid base64") from ex

    if not data.startswith(PNG_SIGNATURE):
        raise HomeAssistantError("Blueprint image must be a PNG")
    if len(data) < 24:
        raise HomeAssistantError("Blueprint image is not a valid PNG")

    width = int.from_bytes(data[16:20], "big")
    height = int.from_bytes(data[20:24], "big")
    if width > MAX_BLUEPRINT_IMAGE_WIDTH or height > MAX_BLUEPRINT_IMAGE_HEIGHT:
        raise HomeAssistantError(
            f"Blueprint image must be at most {MAX_BLUEPRINT_IMAGE_WIDTH}px wide and "
            f"{MAX_BLUEPRINT_IMAGE_HEIGHT}px tall"
        )

    return data

async def save_blueprint( hass, blueprint_id: str, blueprint: dict, image: str | None = None, overwrite: bool = False ):
    if not BLUEPRINT_ID_PATTERN.match(blueprint_id):
        raise HomeAssistantError("Blueprint id may only contain lowercase letters, numbers, dashes and underscores")

    if _component_blueprint_exists(blueprint_id):
        raise HomeAssistantError("Bundled blueprints cannot be overwritten from the editor")

    dest_folder = pathlib.Path(hass.config.path(BLUEPRINTS_FOLDER, DOMAIN))
    yaml_path = pathlib.Path(dest_folder, f"{blueprint_id}.yaml")
    png_path = pathlib.Path(dest_folder, f"{blueprint_id}.png")
    image_data = _decode_blueprint_png(image)

    def doFiles():
        os.makedirs(dest_folder, exist_ok=True)
        if yaml_path.exists() and not overwrite:
            raise HomeAssistantError("A blueprint with this id already exists")

        with open(yaml_path, "w", encoding="utf-8") as f:
            yaml.safe_dump(blueprint, f, sort_keys=False, allow_unicode=False)

        if image_data is not None:
            with open(png_path, "wb") as f:
                f.write(image_data)

    await hass.async_add_executor_job(doFiles)
    return blueprint_id

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