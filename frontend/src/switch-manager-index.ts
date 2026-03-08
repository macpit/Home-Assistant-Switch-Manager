import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  Panel,
  Route,
  SwitchConfig,
  SwitchListItem,
  ConfigsResponse,
} from "./types";
import {
  wsType,
  navigateTo,
  navigate,
  showToast,
  showDialog,
  assetUrl,
} from "./helpers";

import "./dialogs/blueprint-selector";

// MDI icon paths
const mdiPlus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
const mdiStop =
  "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9";
const mdiPlay =
  "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z";
const mdiDelete =
  "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const mdiGestureTapButton =
  "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z";
const mdiArrowUp = "M7,15L12,10L17,15H7Z";
const mdiArrowDown = "M7,10L12,15L17,10H7Z";
const mdiMagnify =
  "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";

@customElement("switch-manager-index")
export class SwitchManagerIndex extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) panel!: Panel;
  @property({ attribute: false }) route?: Route;

  @state() private _data: SwitchListItem[] = [];
  @state() private _filter = "";
  @state() private _sortColumn = "name";
  @state() private _sortDirection: "asc" | "desc" = "asc";

  connectedCallback() {
    super.connectedCallback();
    try {
      const saved = JSON.parse(
        localStorage.getItem("switchManagerSort") || "{}"
      );
      if (saved.column) this._sortColumn = saved.column;
      if (saved.direction) this._sortDirection = saved.direction;
    } catch {}
    this._populateSwitches();
  }

  private get _filteredSortedData(): SwitchListItem[] {
    let items = this._data;

    if (this._filter) {
      const f = this._filter.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(f) ||
          item.service.toLowerCase().includes(f) ||
          item.type.toLowerCase().includes(f)
      );
    }

    const col = this._sortColumn;
    const dir = this._sortDirection === "asc" ? 1 : -1;
    return [...items].sort((a, b) => {
      if (col === "enabled") {
        return ((a.enabled ? 1 : 0) - (b.enabled ? 1 : 0)) * dir;
      }
      const aVal = String((a as any)[col] || "").toLowerCase();
      const bVal = String((b as any)[col] || "").toLowerCase();
      return aVal.localeCompare(bVal) * dir;
    });
  }

  private _toggleSort(column: string) {
    if (this._sortColumn === column) {
      this._sortDirection = this._sortDirection === "asc" ? "desc" : "asc";
    } else {
      this._sortColumn = column;
      this._sortDirection = "asc";
    }
    localStorage.setItem(
      "switchManagerSort",
      JSON.stringify({
        column: this._sortColumn,
        direction: this._sortDirection,
      })
    );
  }

  private _sortIcon(column: string) {
    if (this._sortColumn !== column) return nothing;
    return html`<ha-svg-icon
      .path=${this._sortDirection === "asc" ? mdiArrowUp : mdiArrowDown}
    ></ha-svg-icon>`;
  }

  private _getOverflowItems(item: SwitchListItem) {
    return [
      {
        path: item.enabled ? mdiStop : mdiPlay,
        label: item.enabled ? "Disable" : "Enable",
        action: () => this._toggleEnabled(item.switch_id, item.enabled),
      },
      {
        path: mdiDelete,
        label: "Delete",
        action: () => this._deleteConfirm(item),
        warning: true,
      },
    ];
  }

  render() {
    const data = this._filteredSortedData;
    return html`
      <ha-app-layout>
        <app-header slot="header" fixed>
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <div main-title>Switch Manager</div>
            <div>v${this.panel.config.version}</div>
          </app-toolbar>
        </app-header>
      </ha-app-layout>
      <hui-view>
        <hui-panel-view>
          <div class="content">
            <div class="search-bar">
              <ha-svg-icon .path=${mdiMagnify}></ha-svg-icon>
              <input
                type="text"
                placeholder="Search"
                .value=${this._filter}
                @input=${(e: Event) => {
                  this._filter = (e.target as HTMLInputElement).value;
                }}
              />
            </div>
            <div class="table">
              <div class="thead">
                <div class="tr">
                  <div class="th col-image"></div>
                  <div
                    class="th col-name sortable"
                    @click=${() => this._toggleSort("name")}
                  >
                    Name ${this._sortIcon("name")}
                  </div>
                  ${!this.narrow
                    ? html`
                        <div
                          class="th col-service sortable"
                          @click=${() => this._toggleSort("service")}
                        >
                          Service ${this._sortIcon("service")}
                        </div>
                        <div
                          class="th col-type sortable"
                          @click=${() => this._toggleSort("type")}
                        >
                          Type ${this._sortIcon("type")}
                        </div>
                      `
                    : nothing}
                  <div class="th col-actions"></div>
                </div>
              </div>
              <div class="tbody">
                ${data.length === 0
                  ? html`<div class="empty">
                      ${this._data.length === 0
                        ? "No Switches configured"
                        : "No matches found"}
                    </div>`
                  : data.map(
                      (item) => html`
                        <div
                          class="tr row-item"
                          @click=${() => this._editSwitch(item.switch_id)}
                        >
                          <div class="td col-image">
                            ${item.switch.valid_blueprint &&
                            item.switch.blueprint.has_image
                              ? html`<img
                                  src="${assetUrl(
                                    item.blueprint_id + ".png"
                                  )}"
                                />`
                              : html`<ha-svg-icon
                                  .path=${mdiGestureTapButton}
                                ></ha-svg-icon>`}
                          </div>
                          <div class="td col-name">
                            <span class="name-text">
                              ${item.error
                                ? html`<span class="error"
                                    >${item.name} (${item.error})</span
                                  >`
                                : item.name}
                            </span>
                            ${!item.enabled
                              ? html`<span class="disabled-badge"
                                  >Disabled</span
                                >`
                              : nothing}
                          </div>
                          ${!this.narrow
                            ? html`
                                <div class="td col-service">
                                  ${item.service}
                                </div>
                                <div class="td col-type">${item.type}</div>
                              `
                            : nothing}
                          <div class="td col-actions" @click=${(e: Event) => e.stopPropagation()}>
                            <ha-icon-overflow-menu
                              .hass=${this.hass}
                              .items=${this._getOverflowItems(item)}
                            ></ha-icon-overflow-menu>
                          </div>
                        </div>
                      `
                    )}
              </div>
            </div>
            <div class="fab-container">
              <ha-fab
                slot="fab"
                .label=${"Add Switch"}
                extended
                @click=${this._showBlueprintDialog}
              >
                <ha-svg-icon slot="icon" .path=${mdiPlus}></ha-svg-icon>
              </ha-fab>
            </div>
          </div>
        </hui-panel-view>
      </hui-view>
    `;
  }

  private _populateSwitches() {
    this.hass
      .callWS<ConfigsResponse>({ type: wsType("configs") })
      .then((res) => {
        const items: SwitchListItem[] = [];
        Object.values(res.configs).forEach((sw: any) => {
          const bp = sw.valid_blueprint
            ? sw.blueprint
            : { id: sw.blueprint, service: "", name: "" };
          items.push({
            switch: sw,
            blueprint_id: bp.id,
            switch_id: sw.id,
            error: sw._error,
            enabled: sw.enabled,
            name: sw.name,
            service: bp.service || "",
            type: bp.name || "",
            actions: sw.id,
          });
        });
        this._data = items;
      });
  }

  private _editSwitch(id: string) {
    navigate(navigateTo(`edit/${id}`));
  }

  private async _toggleEnabled(switchId: string, currentEnabled: boolean) {
    try {
      const res = await this.hass.callWS<{ enabled: boolean }>({
        type: wsType("config/enabled"),
        enabled: !currentEnabled,
        config_id: switchId,
      });
      this._populateSwitches();
      showToast(this, `Switch ${res.enabled ? "Enabled" : "Disabled"}`);
    } catch (e: any) {
      showToast(this, e.message);
    }
  }

  private async _deleteConfirm(item: SwitchListItem) {
    showDialog(
      this,
      "switch-manager-dialog-confirm",
      () => import("./dialogs/confirm"),
      {
        title: "Delete switch?",
        text: `${item.name} will be permanently deleted.`,
        confirmText: "Delete",
        dismissText: "Cancel",
        confirm: () => this._delete(item.switch_id),
        confirmation: true,
        destructive: true,
      }
    );
  }

  private async _delete(switchId: string) {
    try {
      await this.hass.callWS({
        type: wsType("config/delete"),
        config_id: switchId.toString(),
      });
      this._populateSwitches();
      showToast(this, "Switch Deleted");
    } catch (e: any) {
      showToast(this, e.message);
    }
  }

  private _showBlueprintDialog() {
    showDialog(
      this,
      "switch-manager-dialog-blueprint-selector",
      () => import("./dialogs/blueprint-selector"),
      {}
    );
  }

  static styles = css`
    :host {
      display: block;
    }
    hui-view {
      display: block;
      height: calc(100vh - var(--header-height));
      overflow-y: auto;
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
    .content {
      padding: 0;
    }

    /* Search */
    .search-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: var(--card-background-color, var(--ha-card-background, var(--secondary-background-color)));
      border-bottom: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
    }
    .search-bar ha-svg-icon {
      flex-shrink: 0;
      --mdc-icon-size: 24px;
    }
    .search-bar input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 1em;
      color: var(--primary-text-color);
      font-family: inherit;
    }
    .search-bar input::placeholder {
      color: var(--secondary-text-color);
    }

    /* Table */
    .table {
      width: 100%;
    }
    .thead {
      border-bottom: 1px solid var(--divider-color);
    }
    .tr {
      display: flex;
      align-items: center;
    }
    .th {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--primary-text-color);
      padding: 8px 16px;
      user-select: none;
    }
    .th.sortable {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .th.sortable:hover {
      color: var(--primary-color);
    }
    .th ha-svg-icon {
      width: 16px;
      height: 16px;
    }
    .row-item {
      border-bottom: 1px solid var(--divider-color);
      cursor: pointer;
    }
    .row-item:hover {
      background: var(--secondary-background-color);
    }
    .td {
      padding: 0 16px;
    }

    /* Columns */
    .col-image {
      width: 90px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .col-image img {
      max-width: 100%;
      max-height: 48px;
      display: block;
    }
    .col-image ha-svg-icon {
      color: var(--primary-color);
      width: 40px;
      height: 40px;
    }
    .col-name {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .name-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .disabled-badge {
      flex-shrink: 0;
      font-size: 0.75rem;
      padding: 2px 8px;
      border-radius: 12px;
      border: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .col-service {
      width: 15%;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .col-type {
      width: 15%;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .col-actions {
      width: 48px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    .error {
      color: var(--error-color, red);
    }
    .warning {
      color: var(--error-color);
    }
    .empty {
      text-align: center;
      padding: 32px;
      color: var(--secondary-text-color);
      font-size: 1.2em;
    }
    .fab-container {
      position: fixed;
      right: 0;
      bottom: 0;
      padding: 1.2em;
      z-index: 1;
    }
  `;
}
