import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../switch-manager-dialog";
import { notifyDialogClosed } from "../helpers";

@customElement("switch-manager-dialog-rename-switch")
export class SwitchManagerDialogRenameSwitch extends LitElement {
  @state() private _params?: any;
  @state() private _name = "";

  public showDialog(params: any) {
    this._params = params;
    this._name = params.config?.name || "";
  }

  public closeDialog() {
    this._close(false);
  }

  // onClose(saved) lets the caller tell Save from Cancel/ESC/backdrop (#76).
  private _close(saved: boolean) {
    if (!this._params) return;
    const params = this._params;
    this._params = undefined;
    params.onClose?.(saved);
    notifyDialogClosed(this);
  }

  render() {
    if (!this._params) return html``;
    return html`
      <switch-manager-dialog @closed=${this.closeDialog} heading="Rename Switch">
        <input
          class="text-input"
          type="text"
          placeholder="Name"
          .value=${this._name}
          autofocus
          @input=${(e: InputEvent) =>
            (this._name = (e.target as HTMLInputElement).value)}
        />
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
        <button slot="actions" @click=${this._save}>Save</button>
      </switch-manager-dialog>
    `;
  }

  private _save() {
    if (this._name.trim()) {
      this._params?.update?.({ name: this._name.trim() });
    }
    this._close(true);
  }

  static styles = css`
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
  `;
}
