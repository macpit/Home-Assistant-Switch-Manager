import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../switch-manager-dialog";
import { notifyDialogClosed } from "../helpers";

@customElement("switch-manager-dialog-confirm")
export class SwitchManagerDialogConfirm extends LitElement {
  @state() private _params?: any;

  public showDialog(params: any) {
    this._params = params;
  }

  public closeDialog() {
    if (!this._params) return;
    this._params = undefined;
    notifyDialogClosed(this);
  }

  render() {
    if (!this._params) return html``;
    return html`
      <switch-manager-dialog
        @closed=${this._dismiss}
        .heading=${this._params.title || "Confirm"}
      >
        <div>${this._params.text || ""}</div>
        ${this._params.prompt
          ? html`<input
              id="prompt-input"
              class="text-input"
              type="text"
              .value=${this._params.promptValue || ""}
            />`
          : ""}
        <button slot="actions" @click=${this._dismiss}>
          ${this._params.dismissText || "Cancel"}
        </button>
        <button
          slot="actions"
          @click=${this._confirm}
          class=${this._params.destructive ? "destructive" : ""}
        >
          ${this._params.confirmText || "OK"}
        </button>
      </switch-manager-dialog>
    `;
  }

  private _dismiss() {
    this._params?.cancel?.();
    this.closeDialog();
  }

  private _confirm() {
    this._params?.confirm?.();
    this.closeDialog();
  }

  static styles = css`
    .text-input {
      width: 100%;
      box-sizing: border-box;
      margin-top: 8px;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
    }
  `;
}
