# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Home Assistant custom integration for managing wireless switch button presses (events and MQTT). This is a maintained fork of the abandoned `Sian-Lee-SA/Home-Assistant-Switch-Manager`. Installable via HACS as a custom repository.

## Build Commands

### Frontend (TypeScript/Lit)
```bash
cd frontend
npm install
npm run build          # Production build (minified, no sourcemaps)
npm run watch          # Development build with watch mode
```

The build outputs a single IIFE bundle to `custom_components/switch_manager/assets/switch_manager_panel.js`.

### Validation
```bash
# Runs automatically via GitHub Actions, but can be triggered locally:
# HACS validation: .github/workflows/hacs.yaml
# Hassfest validation: .github/workflows/hassfest.yaml
```

There are no unit tests in this project.

## Architecture

### Backend (Python - `custom_components/switch_manager/`)

- **`__init__.py`** - Integration setup: loads blueprints, initializes switch configs from storage, registers services (`reload`, `set_variables`)
- **`models.py`** - Core domain models: `Blueprint`, `BlueprintButton`, `BlueprintButtonAction`, `ManagedSwitchConfig`, `ManagedSwitchConfigButton`, `ManagedSwitchConfigButtonAction`. Blueprints define switch structure; ManagedSwitchConfigs hold user-configured switches with their action sequences
- **`connections.py`** - WebSocket API handlers for the frontend (CRUD for configs, blueprint listing, auto-discovery, monitoring)
- **`store.py`** - Persistence via HA's `helpers.storage.Store`. Data stored at `/homeassistant/.storage/switch_manager`
- **`helpers.py`** - Blueprint loading from YAML files, deployment, MQTT message formatting, version from `manifest.json`
- **`view.py`** - Registers the frontend panel and serves blueprint images as static paths
- **`schema.py`** - Voluptuous schemas for blueprint and config validation

**Event flow:** Event/MQTT received -> `ManagedSwitchConfig.start()` callback -> conditions checked (root -> button -> action) -> matching action's `Script` executed

### Frontend (TypeScript/Lit - `frontend/src/`)

Reverse-engineered from the original minified JS. Uses Lit web components with HA's frontend patterns.

- **`switch-manager-panel.ts`** - Router: renders index or editor based on URL path
- **`switch-manager-index.ts`** - Switch list view
- **`switch-manager-switch-editor.ts`** - Switch editor with blueprint image, button selection, action sequences
- **`dialogs/`** - Modal dialogs (blueprint selector, identifier auto-discovery, variables editor, etc.)

Communicates with backend via WebSocket commands prefixed `switch_manager/`.

### Blueprints (`custom_components/switch_manager/blueprints/`)

YAML files defining switch types (buttons, actions, conditions). Deployed to `config/blueprints/switch_manager/` on HA. Each blueprint can have a matching PNG image.

## Key Conventions

- Version is single-sourced in `manifest.json` - update it there (helpers.py reads it at runtime)
- `hacs.json` must stay in sync (minimum HA version)
- Blueprint filenames: `{service-name}-{switch-name}.yaml` (lowercase, with matching `.png`)
- The frontend bundle (`assets/switch_manager_panel.js`) is committed to the repo since HA loads it directly
