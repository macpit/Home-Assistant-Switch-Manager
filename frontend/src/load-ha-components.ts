// Loads HA's runtime components (selectors, service control, ...) by driving
// HA's own config/automation route loaders, so the editor uses the components
// of the running HA instead of a frozen copy.
//
// Adapted from @kipk/load-ha-components 1.0.3 (MIT). The temporary
// partial-panel-resolver gets a hass stub that is complete enough for
// HA >= 2026.8, which reads hass.auth and hass.config after loading a route
// and otherwise logs "Cannot read properties of undefined (reading 'external')"
// in the browser console (#76).

const TIMEOUT_MS = 10000;

function withTimeout<T>(promise: Promise<T>, what: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout ${what}`)), TIMEOUT_MS)
    ),
  ]);
}

export async function loadHaComponents(components: string[]): Promise<void> {
  if (components.every((c) => customElements.get(c))) return;

  await withTimeout(
    customElements.whenDefined("partial-panel-resolver"),
    "waiting for partial-panel-resolver"
  );
  const resolver = document.createElement("partial-panel-resolver") as any;
  resolver.hass = {
    panels: [{ url_path: "tmp", component_name: "config" }],
    auth: {},
    config: { state: "RUNNING" },
  };
  if (typeof resolver._updateRoutes !== "function") {
    throw new Error("partial-panel-resolver has no _updateRoutes method");
  }
  resolver._updateRoutes();
  const tmpRoute = resolver.routerOptions?.routes?.tmp;
  if (!tmpRoute?.load) throw new Error("no tmp route in partial-panel-resolver");
  await withTimeout(tmpRoute.load(), "loading the config panel");

  await withTimeout(
    customElements.whenDefined("ha-panel-config"),
    "waiting for ha-panel-config"
  );
  const configPanel = document.createElement("ha-panel-config") as any;
  const automationRoute = configPanel.routerOptions?.routes?.automation;
  if (!automationRoute?.load) throw new Error("no automation route in ha-panel-config");
  await withTimeout(automationRoute.load(), "loading the automation editor");

  const missing = components.filter((c) => !customElements.get(c));
  if (missing.length) throw new Error(`Failed to load components: ${missing.join(", ")}`);
}
