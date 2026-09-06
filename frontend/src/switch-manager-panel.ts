import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { loadHaComponents } from "./load-ha-components";
import type { HomeAssistant, Panel, Route } from "./types";

import "./switch-manager-index";
import "./switch-manager-switch-editor";

// HA runtime components the panel + action editor depend on. loadHaComponents()
// drives HA's config/automation route loader, which transitively registers the
// whole selector/service-control tree the editor needs (so they match the live
// hass instead of being frozen in our bundle).
const HA_COMPONENTS = [
  "ha-automation-action",
  "ha-service-control",
  "ha-selector",
  "ha-yaml-editor",
  "ha-card",
  "ha-alert",
  "ha-svg-icon",
  "ha-icon-button",
  "ha-menu-button",
  "ha-switch",
  "ha-formfield",
];

@customElement("switch-manager-panel")
export class SwitchManagerPanel extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) panel!: Panel;

  @state() private _params: Record<string, string> = {};
  @state() private _componentsLoaded = false;
  private _route?: Route;

  @property({ attribute: false })
  set route(route: Route) {
    this._route = route;
    const parts = route.path.split("/");
    if (parts[1] === "new") {
      this._params = { action: "new", blueprint: parts[2] };
    } else if (parts[1] === "edit") {
      this._params = { action: "edit", id: parts[2] };
    } else {
      this._params = {};
    }
  }

  get route(): Route | undefined {
    return this._route;
  }

  render() {
    if (!this._componentsLoaded) {
      return html`<div class="loading">Loading…</div>`;
    }
    if ("action" in this._params) {
      return html`
        <switch-manager-switch-editor
          .hass=${this.hass}
          .narrow=${this.narrow}
          .route=${this._route}
          .panel=${this.panel}
          .params=${this._params}
        ></switch-manager-switch-editor>
      `;
    }
    return html`
      <switch-manager-index
        .hass=${this.hass}
        .narrow=${this.narrow}
        .route=${this._route}
        .panel=${this.panel}
      ></switch-manager-index>
    `;
  }

  async firstUpdated() {
    this.hass.loadFragmentTranslation("config");
    this.hass.loadBackendTranslation("title");
    this.hass.loadBackendTranslation("device_automation");
    this.hass.loadBackendTranslation("config");
    // Backend translations the selector/service-control tree needs to resolve
    // entity states, services and selector labels (without these the Option
    // dropdown and Targets stay empty).
    this.hass.loadBackendTranslation("services");
    this.hass.loadBackendTranslation("selector");
    this.hass.loadBackendTranslation("entity_component");
    this._applyTheme();
    try {
      await loadHaComponents(HA_COMPONENTS);
    } catch (err) {
      // Non-fatal: log and continue so the panel still renders.
      console.error("switch_manager: loadHaComponents failed", err);
    }
    this._componentsLoaded = true;
  }

  updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (oldHass && oldHass.themes !== this.hass.themes) {
      this._applyTheme();
    }
  }

  provideHass(el: any) {
    el.hass = this.hass;
  }

  private _applyTheme() {
    this.style.backgroundColor = "var(--primary-background-color)";
    this.style.color = "var(--primary-text-color)";
    this.style.fontFamily =
      "var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif))";
  }

  static styles = css`
    :host {
      display: block;
    }
    .loading {
      padding: 24px;
      color: var(--secondary-text-color);
    }
  `;
}
