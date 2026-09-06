import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HomeAssistant, SwitchConfig, CopyFromResponse } from "../types";
import { wsType, notifyDialogClosed } from "../helpers";
import "../switch-manager-dialog";

@customElement("switch-manager-dialog-copy-from")
export class SwitchManagerDialogCopyFrom extends LitElement {
  @state() private _params?: any;
  @state() private _switches: SwitchConfig[] = [];
  @state() private _copyVariables = true;
  private hass!: HomeAssistant;

  public showDialog(params: any) {
    this._params = params;
    this.hass =
      (this.parentElement as any)?.hass ||
      (document.querySelector("home-assistant") as any)?.hass;
    this._loadSwitches();
  }

  public closeDialog() {
    if (!this._params) return;
    const params = this._params;
    this._params = undefined;
    this._switches = [];
    params.onClose?.();
    notifyDialogClosed(this);
  }

  private async _loadSwitches() {
    const res = await this.hass.callWS<CopyFromResponse>({
      type: wsType("copy_from_list"),
      blueprint_id: this._params.blueprint_id,
      skip_config_id: this._params.current_switch_id || "",
    });
    this._switches = res.switches;
  }

  render() {
    if (!this._params) return html``;
    return html`
      <switch-manager-dialog @closed=${this.closeDialog} heading="Copy From">
        <div class="content">
          ${this._switches.length === 0
            ? html`<p>No other switches with this blueprint found.</p>`
            : html`
                <label class="checkbox">
                  <input
                    type="checkbox"
                    .checked=${this._copyVariables}
                    @change=${(e: Event) =>
                      (this._copyVariables = (e.target as HTMLInputElement).checked)}
                  />
                  Copy variables
                </label>
                <div class="switch-list">
                  ${this._switches.map(
                    (sw) => html`
                      <div
                        class="list-item"
                        @click=${() => this._selectSwitch(sw)}
                      >
                        ${sw.name}
                      </div>
                    `
                  )}
                </div>
              `}
        </div>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
      </switch-manager-dialog>
    `;
  }

  private _selectSwitch(sw: SwitchConfig) {
    this._params?.update?.({
      buttons: JSON.parse(JSON.stringify(sw.buttons)),
      variables: this._copyVariables
        ? JSON.parse(JSON.stringify(sw.variables || {}))
        : false,
    });
    this.closeDialog();
  }

  static styles = css`
    .content {
      min-width: 300px;
    }
    .switch-list {
      margin-top: 8px;
    }
    .list-item {
      cursor: pointer;
      padding: 12px 8px;
      border-radius: 4px;
    }
    .list-item:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    }
    .checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      cursor: pointer;
    }
  `;
}
