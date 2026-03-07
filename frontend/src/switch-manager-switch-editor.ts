import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import type {
  HomeAssistant,
  Panel,
  Route,
  Blueprint,
  SwitchConfig,
  ConfigsResponse,
  BlueprintsResponse,
  SaveConfigResponse,
} from "./types";
import {
  SCRIPT_MODES,
  wsType,
  navigateTo,
  navigate,
  createEmptyConfig,
  showToast,
  showDialog,
  assetUrl,
} from "./helpers";

import "./switch-manager-button-actions";

// MDI icon paths
const mdiArrowLeft =
  "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";
const mdiDotsVertical =
  "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
const mdiIdentifier =
  "M10 7V9H9V15H10V17H6V15H7V9H6V7H10M16 7C17.11 7 18 7.9 18 9V15C18 16.11 17.11 17 16 17H12V7M16 9H14V15H16V9Z";
const mdiRename =
  "M18,17H10.5L12.5,15H18M6,17V14.5L13.88,6.65C14.07,6.45 14.39,6.45 14.59,6.65L16.35,8.41C16.55,8.61 16.55,8.92 16.35,9.12L8.47,17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z";
const mdiRotate =
  "M16.89,15.5L18.31,16.89C19.21,15.73 19.76,14.39 19.93,13H17.91C17.77,13.87 17.43,14.72 16.89,15.5M13,17.9V19.92C14.39,19.75 15.74,19.21 16.9,18.31L15.46,16.87C14.71,17.41 13.87,17.76 13,17.9M19.93,11C19.76,9.61 19.21,8.27 18.31,7.11L16.89,8.53C17.43,9.28 17.77,10.13 17.91,11M15.55,5.55L11,1V4.07C7.06,4.56 4,7.92 4,12C4,16.08 7.05,19.44 11,19.93V17.91C8.16,17.43 6,14.97 6,12C6,9.03 8.16,6.57 11,6.09V10L15.55,5.55Z";
const mdiVariables =
  "M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z";
const mdiCopy =
  "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";
const mdiDelete =
  "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const mdiSave =
  "M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z";
const mdiSwitchIcon =
  "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z";

@customElement("switch-manager-switch-editor")
export class SwitchManagerSwitchEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) panel!: Panel;
  @property({ attribute: false }) route?: Route;
  @property({ attribute: false }) params!: Record<string, string>;

  @property({ attribute: false }) blueprint?: Blueprint;
  @property({ attribute: false }) config?: SwitchConfig;
  @property({ type: Boolean }) disabled = false;

  @state() private _subscribedMonitor?: () => void;
  @state() private _reloadListener?: () => void;
  @state() private sequence: unknown[] = [];
  @state() private button_index = 0;
  @state() private action_index = 0;
  @state() private is_new = true;
  @state() private _is_yaml = false;
  @state() private _dirty = false;
  @state() private _debug = false;
  @state() private _block_save = false;
  @state() private _errors?: string;

  @query("#switch-svg") svg!: SVGSVGElement;
  @query("switch-manager-button-actions")
  button_actions!: HTMLElement & { flash: (idx: number) => void };
  @query("ha-yaml-editor") _yamlEditor?: HTMLElement & {
    setValue: (v: unknown) => void;
  };

  render() {
    if (!this.config) return html``;

    const hasError = !!this.config._error;

    return html`
      <ha-app-layout>
        <app-header slot="header" fixed>
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <ha-icon-button
              .path=${mdiArrowLeft}
              @click=${this._backTapped}
            ></ha-icon-button>
            <div main-title id="title-container">
              <span>Switch Manager - ${this.config?.name}</span>
            </div>
            <div>
              <ha-button-menu corner="BOTTOM_START" slot="toolbar-icon">
                <ha-icon-button
                  slot="trigger"
                  .label=${this.hass.localize("ui.common.menu")}
                  .path=${mdiDotsVertical}
                ></ha-icon-button>
                <mwc-list-item
                  graphic="icon"
                  .disabled=${!this.config || hasError}
                  @click=${this._showIdentifierAutoDiscoveryDialog}
                >
                  Identifier
                  <ha-svg-icon
                    slot="graphic"
                    .path=${mdiIdentifier}
                  ></ha-svg-icon>
                </mwc-list-item>
                <mwc-list-item graphic="icon" @click=${this._showRenameDialog}>
                  Rename
                  <ha-svg-icon
                    slot="graphic"
                    .path=${mdiRename}
                  ></ha-svg-icon>
                </mwc-list-item>
                <mwc-list-item graphic="icon" @click=${this._rotate}>
                  Rotate
                  <ha-svg-icon
                    slot="graphic"
                    .path=${mdiRotate}
                  ></ha-svg-icon>
                </mwc-list-item>
                <mwc-list-item
                  graphic="icon"
                  .disabled=${!this.config || hasError}
                  @click=${this._showVariablesEditorDialog}
                >
                  Variables
                  <ha-svg-icon
                    slot="graphic"
                    .path=${mdiVariables}
                  ></ha-svg-icon>
                </mwc-list-item>
                <mwc-list-item
                  graphic="icon"
                  .disabled=${!this.config || hasError}
                  @click=${this._showCopyFromDialog}
                >
                  Copy From
                  <ha-svg-icon
                    slot="graphic"
                    .path=${mdiCopy}
                  ></ha-svg-icon>
                </mwc-list-item>
                <mwc-list-item
                  graphic="icon"
                  .disabled=${!this.config || this.is_new || hasError}
                  @click=${this._toggleEnabled}
                >
                  ${this.config?.enabled ? "Disable" : "Enable"}
                  <ha-svg-icon slot="graphic" .path=${"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9"}></ha-svg-icon>
                </mwc-list-item>
                <li divider role="separator"></li>
                <mwc-list-item
                  graphic="icon"
                  .disabled=${!this.config || this.is_new || hasError}
                  @click=${this._toggleDebug}
                >
                  Debug
                  <ha-svg-icon slot="graphic" .path=${"M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z"}></ha-svg-icon>
                </mwc-list-item>
                <li divider role="separator"></li>
                <mwc-list-item
                  .disabled=${this.is_new}
                  class=${classMap({ warning: !this.is_new })}
                  graphic="icon"
                  @click=${this._deleteConfirm}
                >
                  Delete
                  <ha-svg-icon
                    class=${classMap({ warning: !this.is_new })}
                    slot="graphic"
                    .path=${mdiDelete}
                  ></ha-svg-icon>
                </mwc-list-item>
              </ha-button-menu>
            </div>
          </app-toolbar>
        </app-header>
      </ha-app-layout>

      <hui-view>
        <hui-panel-view>
          ${hasError ? nothing : html`<h3 id="blueprint-name">${this.blueprint?.service} / ${this.blueprint?.name}</h3>`}

          <div id="switch-image" rotate="${this.config.rotate}">
            ${!this.blueprint || this.blueprint?.has_image
              ? html`<svg id="switch-svg"></svg>`
              : html`<ha-svg-icon .path=${mdiSwitchIcon}></ha-svg-icon>`}
          </div>

          ${hasError ? nothing : html`
            <switch-manager-button-actions
              .hass=${this.hass}
              .blueprint_actions=${this.blueprint?.buttons[this.button_index]?.actions}
              .config_actions=${this.config.buttons[this.button_index]?.actions}
              .index=${this.action_index}
              @changed=${this._actionChanged}
            ></switch-manager-button-actions>
          `}

          <ha-card outlined>
            <div class="card-content">
              ${this._errors
                ? html`
                    <ha-alert alert-type="error">
                      ${this._errors}
                      ${this.config.is_mismatch
                        ? html`<mwc-button slot="action" @click=${this._fixMismatch}>Fix</mwc-button>`
                        : ""}
                    </ha-alert>
                  `
                : ""}
              ${this.config && !this.config.enabled
                ? html`
                    <ha-alert alert-type="info">
                      Switch is disabled
                      <mwc-button slot="action" @click=${this._toggleEnabled}>Enable</mwc-button>
                    </ha-alert>
                  `
                : ""}
              ${hasError ? nothing : html`
                <div id="sequence-container">
                  <div class="header">
                    <h2 id="sequence-heading" class="name">
                      Sequence
                      <ha-selector-select
                        id="mode-selector"
                        .hass=${this.hass}
                        .value=${this.config?.buttons[this.button_index]?.actions[this.action_index]?.mode}
                        label="Mode"
                        .selector=${{
                          select: {
                            mode: "dropdown",
                            options: SCRIPT_MODES.map((m) => ({
                              label: m.charAt(0).toUpperCase() + m.slice(1),
                              value: m,
                            })),
                          },
                        }}
                        @value-changed=${this._modeValueChanged}
                      ></ha-selector-select>
                    </h2>
                    <ha-button-menu corner="TOP_START" slot="toolbar-icon">
                      <ha-icon-button
                        slot="trigger"
                        .label=${this.hass.localize("ui.common.menu")}
                        .path=${mdiDotsVertical}
                      ></ha-icon-button>
                      <mwc-list-item graphic="icon" @click=${this._toggleYaml}>
                        ${this._is_yaml ? "Visual Editor" : "Yaml Editor"}
                        <ha-svg-icon slot="graphic" .path=${this._is_yaml
                          ? "M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9M21 3H13V9H21V3M19 7H15V5H19V7M13 18.06V11H21V11.1C20.24 11.1 19.57 11.5 19.19 11.89L18.07 13H15V16.07L13 18.06M11 3H3V13H11V3M9 11H5V5H9V11M11 20.06V15H3V21H11V20.06M9 19H5V17H9V19Z"
                          : "M8,12H16V14H8V12M10,20H6V4H13V9H18V12.1L20,10.1V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10V20M8,18H12.1L13,17.1V16H8V18M20.2,13C20.3,13 20.5,13.1 20.6,13.2L21.9,14.5C22.1,14.7 22.1,15.1 21.9,15.3L20.9,16.3L18.8,14.2L19.8,13.2C19.9,13.1 20,13 20.2,13M20.2,16.9L14.1,23H12V20.9L18.1,14.8L20.2,16.9Z"
                        }></ha-svg-icon>
                      </mwc-list-item>
                    </ha-button-menu>
                  </div>
                  ${this._is_yaml
                    ? html`<ha-yaml-editor
                        .hass=${this.hass}
                        .value=${this.sequence}
                        @value-changed=${this._configSequenceChanged}
                      ></ha-yaml-editor>`
                    : html`<ha-automation-action
                        .hass=${this.hass}
                        role="region"
                        aria-labelledby="sequence-heading"
                        .actions=${this.sequence}
                        @value-changed=${this._configSequenceChanged}
                        .narrow=${this.narrow}
                        .disabled=${this.disabled}
                      ></ha-automation-action>`}
                </div>
              `}
            </div>
          </ha-card>

          ${hasError ? nothing : html`
            <div class="fab-container">
              <ha-fab
                slot="fab"
                .label=${"Save"}
                extended
                collapse
                @click=${this._save}
                class=${classMap({ dirty: this._dirty, blocked: this._block_save })}
              >
                <ha-svg-icon slot="icon" .path=${mdiSave}></ha-svg-icon>
              </ha-fab>
            </div>
          `}
        </hui-panel-view>
      </hui-view>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadConfig();
    this._startListeners();
  }

  disconnectedCallback() {
    this._killListener("_reloadListener");
    this._killListener("_subscribedMonitor");
    super.disconnectedCallback();
  }

  private _killListener(name: "_reloadListener" | "_subscribedMonitor") {
    if (this[name]) {
      this[name]!();
      this[name] = undefined;
      return true;
    }
    return false;
  }

  private async _startListeners() {
    this._reloadListener = await this.hass.connection.subscribeEvents(
      (event: any) => {
        if (
          event.data.domain === "switch_manager" &&
          event.data.service === "reload"
        ) {
          this._loadConfig();
        }
      },
      "call_service"
    );
  }

  private _loadConfig() {
    if ("id" in this.params) {
      this.is_new = false;
      this.hass
        .callWS<ConfigsResponse>({
          type: wsType("configs"),
          config_id: this.params.id,
        })
        .then((res) => this._setConfig(res.config!));
    } else {
      this.is_new = true;
      this._dirty = true;
      if ("blueprint" in this.params) {
        this._loadBlueprint(this.params.blueprint).then((res) => {
          this._setConfig(createEmptyConfig(res.blueprint!));
          this._showRenameDialog();
        });
      }
    }
  }

  private _loadBlueprint(id: string) {
    return this.hass.callWS<BlueprintsResponse>({
      type: wsType("blueprints"),
      blueprint_id: id,
    });
  }

  private _setConfig(config: SwitchConfig) {
    this.config = config;
    if (config._error) {
      this._errors = config._error;
      this._block_save = true;
      return;
    }
    this._setBlueprint(config.blueprint);
    this._updateSequence();
    this._monitor();
  }

  private async _monitor() {
    if (this.is_new) return;
    this._killListener("_subscribedMonitor");

    this._subscribedMonitor = await this.hass.connection.subscribeMessage(
      (msg: any) => {
        if (msg.event === "action_triggered") {
          if (!this.config?.identifier) return;
          if (
            msg.button === this.button_index &&
            (this.blueprint?.buttons[this.button_index]?.actions.length ?? 0) >
              1
          ) {
            this.button_actions.flash(msg.action);
          }
          if (this.blueprint?.buttons?.length === 1) {
            showToast(this, "Button Pressed");
            return;
          }
          const rect = this.svg?.querySelector(`[index="${msg.button}"]`);
          if (rect) {
            rect.removeAttribute("pressed");
            rect.setAttribute("pressed", "");
            setTimeout(() => rect.removeAttribute("pressed"), 1000);
          }
        }
        if (
          (msg.event === "incoming" || msg.event === "action_triggered") &&
          this._debug
        ) {
          console.log(msg);
        }
      },
      { type: wsType("config/monitor"), config_id: this.config!.id }
    );
  }

  private _setBlueprint(blueprint: Blueprint) {
    this.blueprint = blueprint;
    this.requestUpdate();
    this._drawSVG();
  }

  private async _drawSVG() {
    if (!this.blueprint?.has_image) return;
    await this.updateComplete;

    // Reset SVG
    const oldSvg = this.svg;
    if (oldSvg) {
      const newSvg = oldSvg.cloneNode(false) as SVGSVGElement;
      oldSvg.parentNode!.replaceChild(newSvg, oldSvg);
    }

    const img = new Image();
    img.src = assetUrl(`${this.blueprint.id}.png`);
    img.onload = () => {
      const svg = this.svg;
      if (!svg) return;
      svg.setAttributeNS(null, "viewBox", `0 0 ${img.width} ${img.height}`);

      const svgImg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );
      svgImg.setAttributeNS(null, "x", "0");
      svgImg.setAttributeNS(null, "y", "0");
      svgImg.setAttributeNS(null, "width", img.width.toString());
      svgImg.setAttributeNS(null, "height", img.height.toString());
      svgImg.setAttributeNS("http://www.w3.org/1999/xlink", "href", img.src);
      svgImg.setAttributeNS(null, "visibility", "visible");
      svg.prepend(svgImg);
    };

    if (this.blueprint.buttons.length > 1) {
      this.blueprint.buttons.forEach((btn, idx) => {
        let el: SVGElement;
        if (btn.x > -1 && btn.y > -1 && btn.width > 0 && btn.height > 0) {
          el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          el.setAttributeNS(null, "x", btn.x.toString());
          el.setAttributeNS(null, "y", btn.y.toString());
          el.setAttributeNS(null, "width", btn.width.toString());
          el.setAttributeNS(null, "height", btn.height.toString());
        } else if (btn.x > -1 && btn.y > -1 && btn.width > 0) {
          el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          el.setAttributeNS(null, "cx", btn.x.toString());
          el.setAttributeNS(null, "cy", btn.y.toString());
          el.setAttributeNS(null, "r", btn.width.toString());
        } else if (btn.d) {
          el = document.createElementNS("http://www.w3.org/2000/svg", "path");
          el.setAttributeNS(null, "d", btn.d.toString());
        } else {
          return;
        }

        el.setAttribute("class", "button");
        el.setAttribute("index", idx.toString());
        if (this.button_index === idx) el.setAttribute("selected", "");
        if (!this._buttonTotalSequence(this.config!.buttons[idx])) {
          el.setAttribute("empty", "");
        }
        el.addEventListener("click", (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          this._setButtonIndex(
            parseInt((e.target as SVGElement).getAttribute("index")!)
          );
        });
        this.svg?.append(el);
      });
    }
  }

  private _buttonTotalSequence(button: { actions: { sequence: unknown[] }[] }) {
    let total = 0;
    button.actions.forEach((a) => (total += a.sequence.length));
    return total;
  }

  private _updateSequence(newSequence?: unknown[]) {
    if (newSequence) {
      this.config!.buttons[this.button_index].actions[
        this.action_index
      ].sequence = newSequence;
    }
    this.sequence = [
      ...(this.config?.buttons[this.button_index]?.actions[this.action_index]
        ?.sequence || []),
    ];
  }

  private _validate(): boolean {
    this._errors = undefined;
    if (!this.config?.identifier) {
      this._showIdentifierAutoDiscoveryDialog();
      return false;
    }
    return true;
  }

  private _save() {
    if (this._block_save || !this._validate() || !this.config || this.config._error) return;

    this._block_save = true;
    this._dirty = false;

    this.hass
      .callWS<SaveConfigResponse>({
        type: wsType("config/save"),
        config: {
          ...this.config,
          blueprint: (this.config.blueprint as any).id,
        },
      })
      .then((res) => {
        if (this.is_new) {
          this.is_new = false;
          this.config!.id = res.config_id;
          navigate(navigateTo(`edit/${res.config_id}`));
          this._monitor();
        }
        showToast(this, "Switch Saved");
      })
      .catch((err) => {
        showToast(this, err.message);
        this._errors = err.message;
        this._dirty = true;
      })
      .finally(() => (this._block_save = false));
  }

  private _backTapped() {
    navigate(navigateTo());
  }

  private _actionChanged(e: CustomEvent) {
    this._setActionIndex(e.detail.index);
  }

  private _setButtonIndex(idx: number) {
    if (idx !== this.button_index) {
      this.button_index = idx;
      this.svg?.querySelector("[selected]")?.removeAttribute("selected");
      this.svg?.querySelector(`[index="${idx}"]`)?.setAttribute("selected", "");
      this._setActionIndex(0);
    }
  }

  private _setActionIndex(idx: number) {
    this.action_index = idx;
    this._updateSequence();
    if (this._is_yaml) this._yamlEditor?.setValue(this.sequence);
  }

  private _configSequenceChanged(e: CustomEvent) {
    let value = e.detail.value;
    if (this._is_yaml && (!value || !Array.isArray(value))) {
      value = [];
    }
    this.requestUpdate("config");
    this._updateSequence(value);
    this._errors = undefined;
    this._dirty = true;
  }

  private _rotate() {
    this.config!.rotate = this.config!.rotate >= 3 ? 0 : this.config!.rotate + 1;
    this.requestUpdate("config");
    this._dirty = true;
  }

  private _toggleDebug() {
    this._debug = !this._debug;
    showToast(this, `Debug ${this._debug ? "Enabled. View dev console" : "Disabled"}`);
  }

  private _toggleYaml() {
    this._is_yaml = !this._is_yaml;
    this.updateComplete.then(() => {
      if (this._is_yaml) this._yamlEditor?.setValue(this.sequence);
    });
  }

  private _modeValueChanged(e: CustomEvent) {
    const current = this.config?.buttons[this.button_index]?.actions[this.action_index]?.mode;
    if (current !== e.detail.value) {
      this.config!.buttons[this.button_index].actions[this.action_index].mode = e.detail.value;
      this.requestUpdate("config");
      this._dirty = true;
    }
  }

  private _toggleEnabled() {
    if (!this.config || this.is_new) return;
    this.config.enabled = !this.config.enabled;
    this.hass.callWS({
      type: wsType("config/enabled"),
      enabled: this.config.enabled,
      config_id: this.config.id,
    });
    this.requestUpdate("config");
  }

  private _fixMismatch() {
    if (!this.config) return;
    this.hass
      .callWS({
        type: wsType("config/save"),
        config: { ...this.config, blueprint: (this.config.blueprint as any).id },
        fix_mismatch: true,
      })
      .then(() => {
        this._errors = undefined;
        this.config!.is_mismatch = false;
        this.requestUpdate();
        showToast(this, "Mismatch Fixed");
      });
  }

  private _deleteConfirm() {
    if (this.is_new) return;
    showDialog(
      this,
      "switch-manager-dialog-confirm",
      () => import("./dialogs/confirm"),
      {
        title: "Delete switch?",
        text: `${this.config?.name} will be permanently deleted.`,
        confirmText: "Delete",
        dismissText: "Cancel",
        confirm: () => {
          this.hass
            .callWS({ type: wsType("config/delete"), config_id: this.config!.id!.toString() })
            .then(() => navigate(navigateTo()));
        },
        confirmation: true,
        destructive: true,
      }
    );
  }

  private _showIdentifierAutoDiscoveryDialog() {
    showDialog(
      this,
      "switch-manager-dialog-identifier-auto-discovery",
      () => import("./dialogs/identifier-auto-discovery"),
      {
        switch_id: this.config?.id,
        identifier: this.config?.identifier,
        blueprint: this.blueprint,
        update: (data: { identifier: string }) => {
          this.config!.identifier = data.identifier;
          this._dirty = true;
          this.requestUpdate();
        },
        onClose: () => {},
      }
    );
  }

  private _showRenameDialog() {
    showDialog(
      this,
      "switch-manager-dialog-rename-switch",
      () => import("./dialogs/rename-switch"),
      {
        config: this.config,
        update: (data: { name: string }) => {
          this.config!.name = data.name;
          this._dirty = true;
          this.requestUpdate();
        },
        onClose: () => {
          if (this.is_new) this._showIdentifierAutoDiscoveryDialog();
        },
      }
    );
  }

  private _showCopyFromDialog() {
    showDialog(
      this,
      "switch-manager-dialog-copy-from",
      () => import("./dialogs/copy-from"),
      {
        blueprint_id: (this.config?.blueprint as any)?.id,
        current_switch_id: this.config?.id,
        update: (data: any) => {
          this.config!.buttons = data.buttons;
          if (data.variables !== false) this.config!.variables = data.variables;
          this._dirty = true;
          this._updateSequence();
          this._drawSVG();
        },
        onClose: () => {},
      }
    );
  }

  private _showVariablesEditorDialog() {
    showDialog(
      this,
      "switch-manager-dialog-variables-editor",
      () => import("./dialogs/variables-editor"),
      {
        config: this.config,
        update: (data: { variables: Record<string, unknown> }) => {
          this.config!.variables = data.variables;
          this._dirty = true;
          this.requestUpdate();
        },
        onClose: () => {},
      }
    );
  }

  static styles = css`
    @keyframes pressed {
      to {
        fill: #3ff17975;
        stroke: #00e903;
      }
    }
    :host {
      --max-width: 1040px;
    }
    ha-app-layout {
      z-index: 5;
    }
    app-toolbar {
      height: var(--header-height);
    }
    app-header,
    app-toolbar {
      background-color: var(
        --app-header-background-color,
        var(--mdc-theme-primary)
      );
      font-weight: 400;
      color: var(--app-header-text-color, var(--mdc-theme-on-primary, #fff));
    }
    mwc-list-item {
      min-width: 165px;
    }
    ha-card {
      margin: 0 auto;
      max-width: var(--max-width);
      --mdc-select-fill-color: transparent;
    }
    switch-manager-button-actions {
      max-width: var(--max-width);
      margin: 0 auto;
    }
    h3 {
      padding-left: 25px;
    }
    hui-view {
      height: calc(100vh - var(--header-height));
      display: block;
      overflow-y: auto;
      padding-bottom: 3em;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      align-items: center;
    }
    .header:first-child {
      margin-top: -16px;
    }
    .header .name {
      font-size: 20px;
      font-weight: 400;
      flex: 1;
      margin-top: 0;
    }
    #switch-image {
      max-height: 380px;
      display: flex;
      margin: 1em;
      justify-content: center;
    }
    #switch-image[rotate="1"] svg {
      rotate: 90deg;
      max-width: 380px;
    }
    #switch-image[rotate="2"] svg {
      rotate: 180deg;
    }
    #switch-image[rotate="3"] svg {
      rotate: 270deg;
      max-width: 380px;
    }
    #sequence-container {
      padding: 28px 20px 0;
    }
    #mode-selector {
      display: inline-block;
      margin-left: 20px;
    }
    #switch-image > svg {
      overflow: visible;
      max-width: 800px;
    }
    #switch-image ha-svg-icon {
      fill: var(--primary-color);
      width: 260px;
      height: 260px;
    }
    #switch-image svg image {
      filter: drop-shadow(0px 0px 8px #00000033);
    }
    #switch-image svg .button {
      fill: #00000000;
      stroke: #00adff3d;
      stroke-width: 3;
      cursor: pointer;
    }
    #switch-image svg .button[empty] {
      fill: #cfcfcf66;
    }
    #switch-image svg .button[selected] {
      fill: #6bd3ff75;
      stroke: #0082e9;
    }
    #switch-image svg .button[pressed] {
      animation: 0.4s pressed;
      animation-iteration-count: 2;
      animation-direction: alternate;
    }
    .warning {
      color: var(--error-color);
    }
    .fab-container {
      position: fixed;
      right: 0;
      bottom: 0;
      overflow: hidden;
      padding: 1.2em;
      z-index: 1;
    }
    ha-fab {
      position: relative;
    }
    ha-fab[collapse] {
      bottom: calc(-80px - env(safe-area-inset-bottom));
      transition: bottom 0.3s;
    }
    ha-fab.dirty {
      bottom: 0;
    }
    ha-fab.blocked {
      bottom: calc(-80px - env(safe-area-inset-bottom));
    }
  `;
}
