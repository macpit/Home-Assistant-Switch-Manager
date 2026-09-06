// Loads HA's runtime components (selectors, service control, ...) by driving
// HA's own config/automation route loaders, so the editor uses the components
// of the running HA instead of a frozen copy.
//
// Adapted from @kipk/load-ha-components 1.0.3 (MIT). That library called the
// async _updateRoutes() of a throw-away partial-panel-resolver, which since
// HA 2026.8 goes on to read hass.auth / hass.panels[currentPage] and rejects
// with "Cannot read properties of undefined" in the console (#76). We only
// need the route table, so ask _getRoutes() for it directly (stable from
// HA 2025.4 to 2026.9) and fall back to _updateRoutes() with a fuller stub.

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
  const panels = [{ url_path: "tmp", component_name: "config" }];
  let routerOptions: any;
  if (typeof resolver._getRoutes === "function") {
    routerOptions = resolver._getRoutes(panels);
  } else if (typeof resolver._updateRoutes === "function") {
    resolver.hass = { panels, auth: {}, config: { state: "RUNNING" } };
    resolver._updateRoutes();
    routerOptions = resolver.routerOptions;
  } else {
    throw new Error("partial-panel-resolver has neither _getRoutes nor _updateRoutes");
  }
  const tmpRoute = routerOptions?.routes?.tmp;
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
