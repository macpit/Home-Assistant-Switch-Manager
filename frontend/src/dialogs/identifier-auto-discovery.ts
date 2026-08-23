import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HomeAssistant, Blueprint } from "../types";
import { wsType } from "../helpers";
import "../switch-manager-dialog";

@customElement("switch-manager-dialog-identifier-auto-discovery")
export class SwitchManagerDialogIdentifierAutoDiscovery extends LitElement {
  @state() private _params?: any;
  @state() private _identifier = "";
  @state() private _discovered: { identifier: string; name?: string }[] = [];
  @state() private _listening = false;
  private _unsubscribe?: () => void;
  private hass!: HomeAssistant;

  public showDialog(params: any) {
    this._params = params;
    this._identifier = params.identifier || "";
    this._discovered = [];
    this.hass =
      (this.parentElement as any)?.hass ||
      (document.querySelector("home-assistant") as any)?.hass;
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
          }
        },
        {
          type: wsType("blueprints/auto_discovery"),
          blueprint_id: blueprint.id,
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
            @input=${(e: InputEvent) =>
              (this._identifier = (e.target as HTMLInputElement).value)}
          />

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
            ? html`<div class="identifier-ref">
                MQTT Discovery Topic:
                <b>${this._params.blueprint.mqtt_topic_format}</b>
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
                                class="list-item"
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

  private _selectIdentifier(id: string) {
    this._identifier = id;
  }

  private _save() {
    this._params?.update?.({ identifier: this._identifier });
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
