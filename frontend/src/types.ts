// Home Assistant types (minimal subset - these come from the running HA instance)
export interface HomeAssistant {
  callWS: <T>(msg: Record<string, unknown>) => Promise<T>;
  connection: {
    subscribeEvents: (
      callback: (event: any) => void,
      eventType: string
    ) => Promise<() => void>;
    subscribeMessage: (
      callback: (msg: any) => void,
      msg: Record<string, unknown>
    ) => Promise<() => void>;
  };
  themes: {
    darkMode: boolean;
    default_theme: string;
    default_dark_theme?: string;
    themes: Record<string, unknown>;
  };
  selectedTheme?: { theme?: string; dark?: boolean };
  localize: (key: string, ...args: any[]) => string;
  loadFragmentTranslation: (fragment: string) => void;
  loadBackendTranslation: (category: string) => void;
  language: string;
}

export interface Route {
  path: string;
  prefix?: string;
}

export interface Panel {
  config: {
    version: string;
    _panel_custom: Record<string, unknown>;
  };
}

// Switch Manager types
export interface BlueprintButtonAction {
  title: string;
  conditions: unknown[];
}

export interface BlueprintButton {
  x: number;
  y: number;
  d?: string;
  width: number;
  height: number;
  conditions: unknown[];
  actions: BlueprintButtonAction[];
}

export interface Blueprint {
  id: string;
  name: string;
  service: string;
  has_image: boolean;
  event_type: string;
  identifier_key: string;
  mqtt_topic_format?: string;
  mqtt_sub_topics?: boolean;
  is_mqtt?: boolean;
  is_event_entity?: boolean;
  conditions: unknown[];
  buttons: BlueprintButton[];
}

export interface SwitchConfigButtonAction {
  sequence: unknown[];
  mode: string;
}

export interface SwitchConfigButton {
  actions: SwitchConfigButtonAction[];
}

export interface SwitchConfig {
  id: string | null;
  name: string;
  enabled: boolean;
  identifier: string;
  blueprint: Blueprint;
  valid_blueprint: boolean;
  is_mismatch: boolean;
  rotate: number;
  buttons: SwitchConfigButton[];
  variables?: Record<string, unknown>;
  _error?: string;
}

export interface SwitchListItem {
  switch: SwitchConfig;
  blueprint_id: string;
  switch_id: string;
  error?: string;
  enabled: boolean;
  name: string;
  service: string;
  type: string;
  actions: string;
}

// WebSocket response types
export interface BlueprintsResponse {
  blueprints: Record<string, Blueprint>;
  blueprint?: Blueprint;
}

export interface ConfigsResponse {
  configs: Record<string, SwitchConfig>;
  config?: SwitchConfig;
}

export interface SaveConfigResponse {
  config_id: string;
  config: SwitchConfig;
}

export interface CopyFromResponse {
  switches: SwitchConfig[];
}
