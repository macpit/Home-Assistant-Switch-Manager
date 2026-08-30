// Self-contained floating action button — replaces HA's ha-fab, which was
// removed from the HA frontend in 2026.5 (#68). Only ha-svg-icon (reliably
// available) is used for the icon, everything else is ours so it never drifts
// with HA again. Extended style (icon + label) like the old ha-fab[extended].
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("switch-manager-fab")
export class SwitchManagerFab extends LitElement {
  @property() label = "";
  @property() path = "";
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`
      <button type="button" ?disabled=${this.disabled} aria-label=${this.label}>
        <ha-svg-icon .path=${this.path}></ha-svg-icon>
        <span>${this.label}</span>
      </button>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      height: 48px;
      padding: 0 20px 0 16px;
      border: none;
      border-radius: 16px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.1px;
      cursor: pointer;
      box-shadow:
        0 3px 5px -1px rgba(0, 0, 0, 0.2),
        0 6px 10px 0 rgba(0, 0, 0, 0.14),
        0 1px 18px 0 rgba(0, 0, 0, 0.12);
      transition: box-shadow 0.2s;
      white-space: nowrap;
    }
    button:hover,
    button:focus-visible {
      box-shadow:
        0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12);
      outline: none;
    }
    button:disabled {
      cursor: default;
      opacity: 0.6;
      box-shadow: none;
    }
    ha-svg-icon {
      width: 24px;
      height: 24px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "switch-manager-fab": SwitchManagerFab;
  }
}
