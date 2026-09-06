import { LitElement, html, css } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import "../switch-manager-dialog";
import { notifyDialogClosed } from "../helpers";

@customElement("switch-manager-dialog-variables-editor")
export class SwitchManagerDialogVariablesEditor extends LitElement {
  @state() private _params?: any;
  @state() private _variables: Record<string, unknown> = {};

  @query("ha-yaml-editor") private _yamlEditor?: HTMLElement & {
    setValue: (v: unknown) => void;
  };

  public showDialog(params: any) {
    this._params = params;
    this._variables = JSON.parse(
      JSON.stringify(params.config?.variables || {})
    );
    // ha-yaml-editor only picks up `value` on its own when auto-update is set, and the
    // dialog element is reused for every switch, so push the variables in by hand each
    // time it opens - otherwise the box stays empty (#57).
    this.updateComplete.then(() => this._yamlEditor?.setValue(this._variables));
  }

  public closeDialog() {
    if (!this._params) return;
    const params = this._params;
    this._params = undefined;
    params.onClose?.();
    notifyDialogClosed(this);
  }

  render() {
    if (!this._params) return html``;
    return html`
      <switch-manager-dialog @closed=${this.closeDialog} heading="Variables">
        <div class="content">
          <ha-yaml-editor
            .defaultValue=${this._variables}
            @value-changed=${(e: CustomEvent) =>
              (this._variables = e.detail.value)}
          ></ha-yaml-editor>
        </div>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
        <button slot="actions" @click=${this._save}>Save</button>
      </switch-manager-dialog>
    `;
  }

  private _save() {
    this._params?.update?.({ variables: this._variables });
    this.closeDialog();
  }

  static styles = css`
    .content {
      min-width: 400px;
    }
  `;
}
