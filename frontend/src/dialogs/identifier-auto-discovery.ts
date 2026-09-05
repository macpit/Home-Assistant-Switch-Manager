import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HomeAssistant, Blueprint } from "../types";
import { wsType } from "../helpers";
import "../switch-manager-dialog";

const INSTANCE_ALL = "__all__";
const INSTANCE_CUSTOM = "__custom__";
const Z2M_DEFAULT_BASE_TOPIC = "zigbee2mqtt";

@customElement("switch-manager-dialog-identifier-auto-discovery")
export class SwitchManagerDialogIdentifierAutoDiscovery extends LitElement {
  @state() private _params?: any;
  @state() private _identifier = "";
  @state() private _discovered: { identifier: string; name?: string }[] = [];
  @state() private _listening = false;
  // Zigbee2MQTT: base topics of the instances found on the broker and what
  // the user picked from them (ALL, CUSTOM or one base topic).
  @state() private _instances: string[] = [];
  @state() private _instanceChoice: string = INSTANCE_ALL;
  @state() private _customBaseTopic = "";
  @state() private _instancesLoading = false;
  @state() private _error = "";
  private _unsubscribe?: () => void;
  private hass!: HomeAssistant;

  public showDialog(params: any) {
    this._params = params;
    this._identifier = params.identifier || "";
    this._discovered = [];
    this._instances = [];
    this._instanceChoice = INSTANCE_ALL;
    this._customBaseTopic = "";
    this._error = "";
    this.hass =
      (this.parentElement as any)?.hass ||
      (document.querySelector("home-assistant") as any)?.hass;
    if ((params.blueprint as Blueprint)?.is_zigbee2mqtt) {
      this._loadInstances().then(() => this._startDiscovery());
    } else {
      this._startDiscovery();
    }
  }

  private async _loadInstances() {
    this._instancesLoading = true;
    try {
      const res = await this.hass.callWS<{ instances: string[] }>({
        type: wsType("zigbee2mqtt/instances"),
      });
      this._instances = res.instances || [];
    } catch {
      this._instances = [];
    } finally {
      this._instancesLoading = false;
    }
  }

  // Base topics discovery should listen on; undefined keeps the blueprint default.
  private _baseTopics(): string[] | undefined {
    if (!this._params?.blueprint?.is_zigbee2mqtt) return undefined;
    if (this._instanceChoice === INSTANCE_CUSTOM) {
      const custom = this._customBaseTopic.trim().replace(/^\/+|\/+$/g, "");
      return custom ? [custom] : undefined;
    }
    if (this._instanceChoice === INSTANCE_ALL) {
      return this._instances.length ? this._instances : undefined;
    }
    return [this._instanceChoice];
  }

  // Topics actually subscribed, shown as a hint below the input.
  private _discoveryTopics(): string[] {
    const format: string = this._params?.blueprint?.mqtt_topic_format || "";
    const bases = this._baseTopics();
    if (!bases) return [format];
    const rest = format.split("/").slice(1).join("/");
    return bases.map((b) => (rest ? `${b}/${rest}` : b));
  }

  private _onInstanceChange(e: Event) {
    this._instanceChoice = (e.target as HTMLSelectElement).value;
    this._restartDiscovery();
  }

  private _onCustomBaseTopicChange(e: Event) {
    this._customBaseTopic = (e.target as HTMLInputElement).value;
    this._restartDiscovery();
  }

  private _restartDiscovery() {
    this._stopDiscovery();
    this._discovered = [];
    this._startDiscovery();
  }

  public closeDialog() {
    this._stopDiscovery();
    this._params?.onClose?.();
    this._params = undefined;
  }

  private async _startDiscovery() {
    const blueprint = this._params.blueprint as Blueprint;
    if (!blueprint) return;

    this._listening = true;
    try {
      this._unsubscribe = await this.hass.connection.subscribeMessage(
        (msg: any) => {
          if (
            msg.identifier &&
            !this._discovered.some((d) => d.identifier === msg.identifier)
          ) {
            this._discovered = [
              ...this._discovered,
              { identifier: msg.identifier, name: msg.name },
            ];
            // Auto-fill the first discovered device so the user doesn't have
            // to know that the list entry must be tapped (#71).
            if (!this._identifier) this._selectIdentifier(msg.identifier);
          }
        },
        {
          type: wsType("blueprints/auto_discovery"),
          blueprint_id: blueprint.id,
          ...(this._baseTopics() ? { base_topics: this._baseTopics() } : {}),
        }
      );
    } catch {
      this._listening = false;
    }
  }

  private _stopDiscovery() {
    this._unsubscribe?.();
    this._unsubscribe = undefined;
    this._listening = false;
  }

  render() {
    if (!this._params) return html``;
    return html`
      <switch-manager-dialog
        @closed=${this.closeDialog}
        heading="Switch Identifier"
      >
        <div class="content">
          <input
            class="text-input"
            type="text"
            placeholder="Identifier"
            .value=${this._identifier}
            @input=${(e: InputEvent) => {
              this._identifier = (e.target as HTMLInputElement).value;
              this._error = "";
            }}
          />
          ${this._error ? html`<div class="error">${this._error}</div>` : ""}

          ${this._params.blueprint?.event_type === "event_entity"
            ? html`<div class="identifier-ref">
                Identifier is the Home Assistant <b>device id</b> of the remote;
                its <code>event.*</code> entities are used.
                |
                <a href="/config/devices/dashboard" target="_blank" rel="noreferrer"
                  >Devices</a
                >
              </div>`
            : this._params.blueprint?.mqtt_topic_format
            ? html`${this._params.blueprint.is_zigbee2mqtt
                  ? this._renderInstanceSelector()
                  : ""}
                <div class="identifier-ref">
                  MQTT Discovery Topic${this._discoveryTopics().length > 1 ? "s" : ""}:
                  <b>${this._discoveryTopics().join(", ")}</b>
                  |
                  <a href="/config/mqtt" target="_blank" rel="noreferrer"
                    >MQTT Tool</a
                  >
                </div>`
            : this._params.blueprint?.event_type
            ? html`<div class="identifier-ref">
                Event Type: <b>${this._params.blueprint.event_type}</b>
                |
                <a href="/developer-tools/event" target="_blank" rel="noreferrer"
                  >Event Tool</a
                >
              </div>`
            : ""}

          ${this._listening
            ? html`
                <div class="discovery">
                  <p>
                    Press a button on your switch to auto-discover its
                    identifier...
                  </p>
                  <div class="spinner"></div>
                  ${this._discovered.length
                    ? html`
                        <div class="discovered-list">
                          ${this._discovered.map(
                            (d) => html`
                              <div
                                class="list-item ${d.identifier === this._identifier
                                  ? "selected"
                                  : ""}"
                                @click=${() => this._selectIdentifier(d.identifier)}
                              >
                                ${d.name
                                  ? html`<b>${d.name}</b>
                                      <span class="list-item-sub">${d.identifier}</span>`
                                  : d.identifier}
                              </div>
                            `
                          )}
                        </div>
                      `
                    : ""}
                </div>
              `
            : ""}
        </div>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
        <button slot="actions" @click=${this._save}>Save</button>
      </switch-manager-dialog>
    `;
  }

  private _renderInstanceSelector() {
    if (this._instancesLoading) {
      return html`<div class="identifier-ref">Looking for Zigbee2MQTT instances...</div>`;
    }
    return html`
      <div class="instance-select">
        <label>
          Zigbee2MQTT instance
          <select .value=${this._instanceChoice} @change=${this._onInstanceChange}>
            ${this._instances.length
              ? html`<option value=${INSTANCE_ALL}>
                    All (${this._instances.length} found)
                  </option>
                  ${this._instances.map(
                    (i) => html`<option value=${i}>${i}</option>`
                  )}`
              : html`<option value=${INSTANCE_ALL}>
                  Default (${Z2M_DEFAULT_BASE_TOPIC})
                </option>`}
            <option value=${INSTANCE_CUSTOM}>Custom base topic...</option>
          </select>
        </label>
        ${this._instanceChoice === INSTANCE_CUSTOM
          ? html`<input
              class="text-input"
              type="text"
              placeholder="Base topic, e.g. zigbee2mqtt"
              .value=${this._customBaseTopic}
              @change=${this._onCustomBaseTopicChange}
            />`
          : ""}
        ${!this._instances.length
          ? html`<div class="identifier-ref hint">
              No Zigbee2MQTT instance detected on the broker (no retained
              <code>+/bridge/state</code>). Listening on the blueprint default;
              pick "Custom base topic..." if yours differs.
            </div>`
          : ""}
      </div>
    `;
  }

  private _selectIdentifier(id: string) {
    this._identifier = id;
    this._error = "";
  }

  private _save() {
    const identifier = this._identifier.trim();
    if (!identifier) {
      // Don't close silently with an empty identifier: the editor would only
      // re-open this dialog on the next save, which looks like a loop (#71).
      this._error =
        "Enter an identifier or press a button on the switch and select it below.";
      return;
    }
    this._params?.update?.({ identifier });
    this.closeDialog();
  }

  static styles = css`
    .content {
      min-width: 300px;
    }
    .text-input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
    }
    .text-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .instance-select {
      margin-top: 16px;
    }
    .instance-select label {
      display: block;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
    .instance-select select {
      display: block;
      width: 100%;
      box-sizing: border-box;
      margin-top: 4px;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
    }
    .instance-select select:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .instance-select .text-input {
      margin-top: 8px;
    }
    .identifier-ref.hint {
      margin-top: 8px;
    .error {
      margin-top: 8px;
      font-size: 0.9em;
      color: var(--error-color, #db4437);
    }
    .identifier-ref {
      margin-top: 16px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
    .identifier-ref a {
      color: var(--primary-color);
    }
    .discovery {
      margin-top: 16px;
      text-align: center;
    }
    .discovered-list {
      margin-top: 8px;
      text-align: left;
    }
    .list-item {
      cursor: pointer;
      padding: 12px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      margin-top: 4px;
    }
    .list-item.selected {
      border-color: var(--primary-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    }
    .list-item-sub {
      display: block;
      font-size: 0.8em;
      color: var(--secondary-text-color);
      word-break: break-all;
    }
    .list-item:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    }
    .spinner {
      width: 32px;
      height: 32px;
      margin: 12px auto;
      border: 3px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-top-color: var(--primary-color);
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
}
