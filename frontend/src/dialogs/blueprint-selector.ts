import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HomeAssistant, Blueprint, BlueprintsResponse } from "../types";
import { wsType, navigateTo, navigate, assetUrl } from "../helpers";
import "../switch-manager-dialog";

const mdiEdit = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";

@customElement("switch-manager-dialog-blueprint-selector")
export class SwitchManagerDialogBlueprintSelector extends LitElement {
  @state() private _params?: any;
  @state() private _blueprints: Blueprint[] = [];
  @state() private _filter = "";
  private hass!: HomeAssistant;

  public showDialog(params: any) {
    this._params = params;
    this.hass = (this.parentElement as any)?.hass || (document.querySelector("home-assistant") as any)?.hass;
    this._loadBlueprints();
  }

  public closeDialog() {
    this._params = undefined;
    this._blueprints = [];
    this._filter = "";
  }

  private async _loadBlueprints() {
    const res = await this.hass.callWS<BlueprintsResponse>({
      type: wsType("blueprints"),
    });
    this._blueprints = Object.values(res.blueprints);
  }

  render() {
    if (!this._params) return html``;

    const filtered = this._filter
      ? this._blueprints.filter(
          (bp) =>
            bp.name.toLowerCase().includes(this._filter.toLowerCase()) ||
            bp.service.toLowerCase().includes(this._filter.toLowerCase())
        )
      : this._blueprints;

    return html`
      <switch-manager-dialog @closed=${this.closeDialog} heading="Select Blueprint">
        <input
          class="search"
          type="text"
          placeholder="Search"
          .value=${this._filter}
          @input=${(e: Event) =>
            (this._filter = (e.target as HTMLInputElement).value)}
        />
        <div class="blueprints">
          ${filtered.map(
            (bp) => html`
              <ha-card
                outlined
                class="blueprint-item"
                @click=${() => this._selectBlueprint(bp)}
              >
                <div class="card-content">
                  ${bp.editable
                    ? html`
                        <button
                          class="edit-btn"
                          title="Edit blueprint"
                          @click=${(e: Event) => this._editBlueprint(e, bp)}
                        >
                          <ha-svg-icon .path=${mdiEdit}></ha-svg-icon>
                        </button>
                      `
                    : nothing}
                  <div class="image">
                    ${bp.has_image
                      ? html`<img src="${assetUrl(bp.id + ".png")}" />`
                      : html`<ha-svg-icon
                          .path=${"M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z"}
                        ></ha-svg-icon>`}
                  </div>
                  <div class="info">
                    <div class="name">${bp.name}</div>
                    <div class="service">${bp.service}</div>
                  </div>
                </div>
              </ha-card>
            `
          )}
        </div>
        <button slot="actions" @click=${this._createBlueprint}>Create Blueprint</button>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
      </switch-manager-dialog>
    `;
  }

  private _selectBlueprint(bp: Blueprint) {
    this.closeDialog();
    navigate(navigateTo(`new/${bp.id}`));
  }

  private _createBlueprint() {
    this.closeDialog();
    navigate(navigateTo("blueprint/new"));
  }

  private _editBlueprint(e: Event, bp: Blueprint) {
    e.preventDefault();
    e.stopPropagation();
    this.closeDialog();
    navigate(navigateTo(`blueprint/edit/${bp.id}`));
  }

  static styles = css`
    .blueprints {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px;
      padding: 8px 0;
      max-height: 60vh;
      overflow-y: auto;
    }
    .blueprint-item {
      cursor: pointer;
    }
    .blueprint-item:hover {
      background: var(--secondary-background-color);
    }
    .card-content {
      text-align: center;
      padding: 8px;
      position: relative;
    }
    .edit-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      border: none;
      background: var(--secondary-background-color);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      z-index: 1;
    }
    .edit-btn:hover {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .edit-btn ha-svg-icon {
      width: 18px;
      height: 18px;
    }
    .image {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image img {
      max-width: 100%;
      max-height: 80px;
    }
    .image ha-svg-icon {
      fill: var(--primary-color);
      width: 60px;
      height: 60px;
    }
    .name {
      font-weight: 500;
      margin-top: 8px;
    }
    .service {
      color: var(--secondary-text-color);
      font-size: 0.85em;
    }
    .search {
      display: block;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 8px;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
    }
  `;
}
