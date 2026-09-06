// Lightweight modal dialog — replaces HA's ha-dialog + mwc-button, so our dialogs
// don't depend on components current HA may not auto-load. Fires a "closed" event
// on backdrop click, ESC, or the close button (matching the previous @closed API).
// Action buttons are provided via the "actions" slot as plain <button> elements.
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

const mdiClose =
  "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";

@customElement("switch-manager-dialog")
export class SwitchManagerDialog extends LitElement {
  @property() heading = "";

  // Where the last pointer press started: selecting text with the mouse and
  // releasing outside the surface makes Chrome fire the resulting click on
  // the backdrop, which must not dismiss the dialog (#76).
  private _pressOnBackdrop = false;

  private _onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") this._close();
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("keydown", this._onKeydown);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this._onKeydown);
  }

  render() {
    return html`
      <div
        class="backdrop"
        @pointerdown=${this._onBackdropPress}
        @click=${this._onBackdropClick}
      >
        <div class="surface" @click=${this._stop}>
          <div class="header">
            <span class="title">${this.heading}</span>
            <ha-icon-button
              .path=${mdiClose}
              label="Close"
              @click=${this._close}
            ></ha-icon-button>
          </div>
          <div class="content"><slot></slot></div>
          <div class="actions"><slot name="actions"></slot></div>
        </div>
      </div>
    `;
  }

  private _stop(e: Event) {
    e.stopPropagation();
  }
  private _onBackdropPress(e: PointerEvent) {
    this._pressOnBackdrop = e.target === e.currentTarget;
  }
  private _onBackdropClick(e: MouseEvent) {
    const pressOnBackdrop = this._pressOnBackdrop;
    this._pressOnBackdrop = false;
    if (e.target === e.currentTarget && pressOnBackdrop) this._close();
  }
  private _close() {
    this.dispatchEvent(new CustomEvent("closed"));
  }

  static styles = css`
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 10;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .surface {
      background: var(--card-background-color, #1c1c1c);
      color: var(--primary-text-color);
      border-radius: 12px;
      min-width: 300px;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
        0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
    }
    .header {
      display: flex;
      align-items: center;
      padding: 12px 12px 0 24px;
    }
    .title {
      flex: 1;
      font-size: 1.25rem;
      font-weight: 500;
    }
    .content {
      padding: 8px 24px 16px;
      overflow-y: auto;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 8px 16px 16px;
    }
    ::slotted(button) {
      background: none;
      border: none;
      cursor: pointer;
      font: inherit;
      text-transform: uppercase;
      font-weight: 500;
      color: var(--primary-color);
      padding: 8px 12px;
      border-radius: 4px;
    }
    ::slotted(button:hover) {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    }
    ::slotted(button.destructive) {
      color: var(--error-color, #db4437);
    }
  `;
}
