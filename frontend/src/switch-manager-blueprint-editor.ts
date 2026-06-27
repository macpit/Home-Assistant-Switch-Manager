import { LitElement, html, svg, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Blueprint, BlueprintButton, BlueprintsResponse, HomeAssistant, Panel, Route } from "./types";
import { assetUrl, navigate, navigateTo, showDialog, showToast, wsType } from "./helpers";

type EditableCondition = { key: string; value: string };
type EditableAction = { title: string; conditions: EditableCondition[] };
type EditableButton = {
  shape: "rectangle" | "circle" | "path";
  x: number;
  y: number;
  width: number;
  height?: number;
  d?: string;
  conditions: EditableCondition[];
  actions: EditableAction[];
};

interface SaveBlueprintResponse {
  blueprint_id: string;
  blueprint: Blueprint;
}

interface EditorSnapshot {
  id: string;
  name: string;
  service: string;
  eventType: string;
  identifierKey: string;
  mqttTopicFormat: string;
  mqttSubTopics: boolean;
  imageDataUrl?: string;
  imageWidth: number;
  imageHeight: number;
  imageChanged: boolean;
  buttons: EditableButton[];
  selectedButton: number;
}

type DragState = {
  idx: number;
  mode: "move" | "resize";
  start: { x: number; y: number };
  origin: EditableButton;
};

const mdiArrowLeft = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";
const mdiSave = "M17,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3M12,19A2,2 0 1,1 14,17A2,2 0 0,1 12,19M6,5H15V9H6V5Z";
const mdiDelete = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const mdiPlus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
const mdiContentCopy =
  "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";
const mdiUndo =
  "M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z";
const mdiRedo =
  "M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.46,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z";

const MAX_HISTORY = 50;

@customElement("switch-manager-blueprint-editor")
export class SwitchManagerBlueprintEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) panel!: Panel;
  @property({ attribute: false }) route?: Route;
  @property({ attribute: false }) params: Record<string, string> = {};

  @state() private _id = "custom-remote";
  @state() private _name = "Custom Remote";
  @state() private _service = "Zigbee2MQTT";
  @state() private _eventType = "mqtt";
  @state() private _identifierKey = "";
  @state() private _mqttTopicFormat = "zigbee2mqtt/+/action";
  @state() private _mqttSubTopics = false;
  @state() private _imageDataUrl?: string;
  @state() private _imageWidth = 0;
  @state() private _imageHeight = 0;
  @state() private _imageChanged = false;
  @state() private _buttons: EditableButton[] = [];
  @state() private _selectedButton = 0;
  @state() private _saving = false;
  @state() private _loading = false;
  @state() private _error?: string;
  @state() private _isEdit = false;
  @state() private _canUndo = false;
  @state() private _canRedo = false;

  private _dirty = false;
  private _baselineSnapshot?: EditorSnapshot;
  private _undoStack: EditorSnapshot[] = [];
  private _redoStack: EditorSnapshot[] = [];
  private _restoringHistory = false;
  private _textHistoryPending = false;
  private _historyDebounce?: ReturnType<typeof setTimeout>;
  private _leavePath = "";
  private _drag?: DragState;
  private _boundPointerMove = (e: PointerEvent) => this._onPointerMove(e);
  private _boundPointerUp = () => this._onPointerUp();
  private _boundBeforeUnload = (e: BeforeUnloadEvent) => this._onBeforeUnload(e);
  private _boundPopState = () => this._onPopState();
  private _boundKeyDown = (e: KeyboardEvent) => this._onKeyDown(e);

  connectedCallback() {
    super.connectedCallback();
    this._leavePath = window.location.pathname;
    window.addEventListener("pointermove", this._boundPointerMove);
    window.addEventListener("pointerup", this._boundPointerUp);
    window.addEventListener("beforeunload", this._boundBeforeUnload);
    window.addEventListener("popstate", this._boundPopState);
    window.addEventListener("keydown", this._boundKeyDown);
    if (this.params?.action === "blueprint-edit" && this.params.id) {
      this._isEdit = true;
      this._loadForEdit(this.params.id);
    } else {
      this._baselineSnapshot = this._snapshot();
    }
  }

  disconnectedCallback() {
    window.removeEventListener("pointermove", this._boundPointerMove);
    window.removeEventListener("pointerup", this._boundPointerUp);
    window.removeEventListener("beforeunload", this._boundBeforeUnload);
    window.removeEventListener("popstate", this._boundPopState);
    window.removeEventListener("keydown", this._boundKeyDown);
    if (this._historyDebounce) clearTimeout(this._historyDebounce);
    super.disconnectedCallback();
  }

  render() {
    if (this._loading) {
      return html`<div class="loading">Loading blueprint…</div>`;
    }

    const selected = this._buttons[this._selectedButton];
    return html`
      <div class="toolbar">
        <ha-icon-button .path=${mdiArrowLeft} @click=${this._back}></ha-icon-button>
        <div class="main-title">${this._isEdit ? "Edit Blueprint" : "Create Blueprint"}</div>
        <div class="toolbar-actions">
          <ha-icon-button
            .path=${mdiUndo}
            ?disabled=${!this._canUndo}
            @click=${this._undo}
            title="Undo (Ctrl+Z)"
          ></ha-icon-button>
          <ha-icon-button
            .path=${mdiRedo}
            ?disabled=${!this._canRedo}
            @click=${this._redo}
            title="Redo (Ctrl+Y)"
          ></ha-icon-button>
        </div>
        <div class="version">v${this.panel.config.version}</div>
      </div>
      <div class="view">
        <div class="grid">
          <section class="card preview-card">
            <h2>Remote Preview</h2>
            <p class="hint">
              Drag buttons to move them. Use the handle on the selected button to resize.
            </p>
            <label class="file-picker">
              <input type="file" accept="image/*" @change=${this._imageSelected} />
              ${this._isEdit ? "Replace remote image" : "Upload remote image"}
            </label>
            ${this._imageDataUrl
              ? html`
                  <div class="preview">
                    <svg viewBox="0 0 ${this._imageWidth} ${this._imageHeight}">
                      <image
                        x="0"
                        y="0"
                        width=${this._imageWidth}
                        height=${this._imageHeight}
                        href=${this._imageDataUrl}
                      ></image>
                      ${this._buttons.map((btn, idx) => this._renderButtonShape(btn, idx))}
                    </svg>
                  </div>
                  <div class="dimensions">
                    ${this._imageWidth}px x ${this._imageHeight}px
                  </div>
                `
              : html`<div class="empty-preview">Upload an image to start.</div>`}
          </section>

          <section class="card form-card">
            <h2>Blueprint Details</h2>
            ${this._error ? html`<ha-alert alert-type="error">${this._error}</ha-alert>` : nothing}
            <div class="fields two">
              ${this._isEdit
                ? html`
                    <label>
                      File id
                      <input .value=${this._id} disabled />
                    </label>
                  `
                : this._textField("File id", this._id, (value) => (this._id = this._slug(value)))}
              ${this._textField("Name", this._name, (value) => {
                this._name = value;
                if (!this._isEdit && (!this._id || this._id === "custom-remote")) {
                  this._id = this._slug(value);
                }
              })}
              ${this._textField("Service", this._service, (value) => (this._service = value))}
              <label>
                Event type
                <select
                  .value=${this._eventType}
                  @change=${(e: Event) => {
                    this._recordHistory();
                    this._eventType = (e.target as HTMLSelectElement).value;
                  }}
                >
                  <option value="mqtt">MQTT</option>
                  <option value="zha_event">ZHA event</option>
                  <option value="deconz_event">deCONZ event</option>
                  <option value="zwave_js_value_notification">Z-Wave JS notification</option>
                </select>
              </label>
              ${this._eventType === "mqtt"
                ? html`
                    ${this._textField("MQTT topic format", this._mqttTopicFormat, (value) => (this._mqttTopicFormat = value))}
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        .checked=${this._mqttSubTopics}
                        @change=${(e: Event) => {
                          this._recordHistory();
                          this._mqttSubTopics = (e.target as HTMLInputElement).checked;
                        }}
                      />
                      Include sub topics
                    </label>
                  `
                : this._textField("Identifier key", this._identifierKey, (value) => (this._identifierKey = value))}
            </div>

            <div class="section-header">
              <h2>Buttons</h2>
              <div class="header-actions">
                <button ?disabled=${this._buttons.length === 0} @click=${this._copyPreviousButton}>
                  <ha-svg-icon .path=${mdiContentCopy}></ha-svg-icon>
                  Copy previous
                </button>
                <button @click=${this._addButton}>
                  <ha-svg-icon .path=${mdiPlus}></ha-svg-icon>
                  Add Button
                </button>
              </div>
            </div>

            ${this._buttons.length
              ? html`
                  <div class="button-tabs">
                    ${this._buttons.map(
                      (_btn, idx) => html`
                        <button
                          class=${idx === this._selectedButton ? "selected" : ""}
                          @click=${() => (this._selectedButton = idx)}
                        >
                          Button ${idx + 1}
                        </button>
                      `
                    )}
                  </div>
                  ${selected ? this._renderButtonEditor(selected, this._selectedButton) : nothing}
                `
              : html`<p class="hint">Add buttons after uploading an image.</p>`}

            <div class="actions">
              <button @click=${this._back}>Cancel</button>
              <button class="primary" ?disabled=${this._saving} @click=${this._save}>
                <ha-svg-icon .path=${mdiSave}></ha-svg-icon>
                ${this._saving ? "Saving..." : this._isEdit ? "Update Blueprint" : "Save Blueprint"}
              </button>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  private _renderButtonShape(btn: EditableButton, idx: number) {
    const selected = idx === this._selectedButton;
    const cls = selected ? "button selected" : "button";

    if (btn.shape === "path") {
      if (!btn.d || !this._isValidPath(btn.d)) return nothing;
      return svg`
        <path
          class=${cls}
          d=${btn.d}
          @pointerdown=${(e: PointerEvent) => this._startDrag(e, idx, "move")}
        ></path>
      `;
    }

    if (btn.shape === "circle") {
      return svg`
        <circle
          class=${cls}
          cx=${btn.x}
          cy=${btn.y}
          r=${btn.width}
          @pointerdown=${(e: PointerEvent) => this._startDrag(e, idx, "move")}
        ></circle>
        ${selected
          ? svg`
              <circle
                class="resize-handle"
                cx=${btn.x + btn.width}
                cy=${btn.y}
                r="8"
                @pointerdown=${(e: PointerEvent) => this._startDrag(e, idx, "resize")}
              ></circle>
            `
          : nothing}
      `;
    }

    const h = btn.height || btn.width;
    return svg`
      <rect
        class=${cls}
        x=${btn.x}
        y=${btn.y}
        width=${btn.width}
        height=${h}
        @pointerdown=${(e: PointerEvent) => this._startDrag(e, idx, "move")}
      ></rect>
      ${selected
        ? svg`
            <rect
              class="resize-handle"
              x=${btn.x + btn.width - 8}
              y=${btn.y + h - 8}
              width="16"
              height="16"
              @pointerdown=${(e: PointerEvent) => this._startDrag(e, idx, "resize")}
            ></rect>
          `
        : nothing}
    `;
  }

  private _renderButtonEditor(btn: EditableButton, idx: number) {
    return html`
      <div class="button-editor">
        <div class="section-header compact">
          <h3>Button ${idx + 1}</h3>
          <button class="danger" @click=${() => this._removeButton(idx)}>
            <ha-svg-icon .path=${mdiDelete}></ha-svg-icon>
            Remove
          </button>
        </div>
        <div class="fields two">
          <label>
            Shape
            <select .value=${btn.shape} @change=${(e: Event) => this._changeShape(idx, (e.target as HTMLSelectElement).value as EditableButton["shape"])}>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="path">Custom path (SVG)</option>
            </select>
          </label>
          ${btn.shape === "path"
            ? nothing
            : html`
                ${this._numberField("X", btn.x, (value) => this._updateButton(idx, { x: value }))}
                ${this._numberField("Y", btn.y, (value) => this._updateButton(idx, { y: value }))}
                ${this._numberField(btn.shape === "circle" ? "Radius" : "Width", btn.width, (value) => this._updateButton(idx, { width: value }))}
                ${btn.shape === "rectangle"
                  ? this._numberField("Height", btn.height || btn.width, (value) => this._updateButton(idx, { height: value }))
                  : nothing}
              `}
        </div>
        ${btn.shape === "path"
          ? html`
              <label class="path-field">
                Custom SVG path (d attribute)
                <textarea
                  rows="4"
                  spellcheck="false"
                  .value=${btn.d || ""}
                  @input=${(e: Event) => {
                    this._recordHistoryForText();
                    this._updateButton(idx, { d: (e.target as HTMLTextAreaElement).value });
                  }}
                ></textarea>
              </label>
              ${btn.d && !this._isValidPath(btn.d)
                ? html`<p class="path-error">This path is not valid SVG. It must start with M/m and contain only path commands and numbers.</p>`
                : html`<p class="hint">Drag the shape in the preview to move it. Coordinates use the image's pixel space.</p>`}
            `
          : nothing}

        <h3>Button Conditions</h3>
        ${this._renderConditions(btn.conditions, (conditions) => this._updateButton(idx, { conditions }))}

        <div class="section-header compact">
          <h3>Actions</h3>
          <button @click=${() => this._addAction(idx)}>
            <ha-svg-icon .path=${mdiPlus}></ha-svg-icon>
            Add Action
          </button>
        </div>
        ${btn.actions.map((action, actionIdx) => this._renderActionEditor(idx, action, actionIdx))}
      </div>
    `;
  }

  private _renderActionEditor(buttonIdx: number, action: EditableAction, actionIdx: number) {
    return html`
      <div class="action-editor">
        <div class="section-header compact">
          ${this._textField("Action title", action.title, (value) => this._updateAction(buttonIdx, actionIdx, { title: value }))}
          <button class="danger" @click=${() => this._removeAction(buttonIdx, actionIdx)}>
            <ha-svg-icon .path=${mdiDelete}></ha-svg-icon>
          </button>
        </div>
        ${this._renderConditions(action.conditions, (conditions) => this._updateAction(buttonIdx, actionIdx, { conditions }))}
      </div>
    `;
  }

  private _renderConditions(conditions: EditableCondition[], update: (conditions: EditableCondition[]) => void) {
    return html`
      <div class="conditions">
        ${conditions.map(
          (condition, idx) => html`
            <div class="condition">
              ${this._textField("Key", condition.key, (value) => {
                const next = [...conditions];
                next[idx] = { ...condition, key: value };
                update(next);
              })}
              ${this._textField("Value", condition.value, (value) => {
                const next = [...conditions];
                next[idx] = { ...condition, value };
                update(next);
              })}
              <button class="danger icon-only" @click=${() => {
                this._recordHistory();
                update(conditions.filter((_c, i) => i !== idx));
              }}>
                <ha-svg-icon .path=${mdiDelete}></ha-svg-icon>
              </button>
            </div>
          `
        )}
        <button @click=${() => {
          this._recordHistory();
          update([...conditions, { key: "", value: "" }]);
        }}>
          <ha-svg-icon .path=${mdiPlus}></ha-svg-icon>
          Add Condition
        </button>
      </div>
    `;
  }

  private _textField(label: string, value: string, update: (value: string) => void) {
    return html`
      <label>
        ${label}
        <input
          .value=${value || ""}
          @input=${(e: Event) => {
            this._recordHistoryForText();
            update((e.target as HTMLInputElement).value);
          }}
        />
      </label>
    `;
  }

  private _numberField(label: string, value: number, update: (value: number) => void) {
    return html`
      <label>
        ${label}
        <input
          type="number"
          min="0"
          .value=${String(value || 0)}
          @input=${(e: Event) => {
            this._recordHistoryForText();
            update(Math.max(0, parseInt((e.target as HTMLInputElement).value || "0", 10)));
          }}
        />
      </label>
    `;
  }

  private async _loadForEdit(id: string) {
    this._loading = true;
    this._error = undefined;
    try {
      const res = await this.hass.callWS<BlueprintsResponse>({
        type: wsType("blueprints"),
        blueprint_id: id,
      });
      const bp = res.blueprint;
      if (!bp) throw new Error("Blueprint not found");
      if (!bp.editable) throw new Error("Bundled blueprints cannot be edited");

      this._id = bp.id;
      this._name = bp.name;
      this._service = bp.service;
      this._eventType = bp.event_type;
      this._identifierKey = bp.identifier_key || "";
      this._mqttTopicFormat = bp.mqtt_topic_format || "";
      this._mqttSubTopics = !!bp.mqtt_sub_topics;
      this._buttons = bp.buttons.map((button) => this._buttonFromBlueprint(button));

      if (bp.has_image) {
        const dataUrl = await this._fetchImageAsDataUrl(assetUrl(`${bp.id}.png`));
        const img = await this._loadImage(dataUrl);
        this._imageDataUrl = dataUrl;
        this._imageWidth = img.width;
        this._imageHeight = img.height;
        this._imageChanged = false;
      }
      this._baselineSnapshot = this._snapshot();
      this._clearHistory();
    } catch (err: any) {
      this._error = err.message || "Unable to load blueprint.";
    } finally {
      this._loading = false;
    }
  }

  private _buttonFromBlueprint(button: BlueprintButton): EditableButton {
    const hasPath = !!button.d;
    const isRectangle = !hasPath && button.height != null && button.height > 0;
    const isCircle = !hasPath && !isRectangle && (button.width ?? 0) > 0;
    const shape: EditableButton["shape"] = hasPath ? "path" : isCircle ? "circle" : "rectangle";
    return {
      shape,
      x: button.x ?? 0,
      y: button.y ?? 0,
      width: button.width ?? 30,
      height: isRectangle ? button.height : button.width ?? 30,
      d: hasPath ? button.d : undefined,
      conditions: this._conditionsFromBlueprint(button.conditions),
      actions: button.actions.map((action) => ({
        title: action.title,
        conditions: this._conditionsFromBlueprint(action.conditions),
      })),
    };
  }

  private _conditionsFromBlueprint(conditions: unknown): EditableCondition[] {
    if (!Array.isArray(conditions)) return [];
    return conditions
      .filter((c): c is { key: string; value: string } => !!c && typeof c === "object" && "key" in c)
      .map((c) => ({ key: String(c.key), value: String(c.value) }));
  }

  private async _fetchImageAsDataUrl(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Unable to load blueprint image");
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }

  private async _imageSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this._recordHistory();
    try {
      const dataUrl = await this._readFile(file);
      const img = await this._loadImage(dataUrl);
      const maxWidth = 800;
      const maxHeight = 500;
      const scale = Math.min(1, maxWidth / img.width, maxHeight / img.height);
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      this._imageDataUrl = canvas.toDataURL("image/png");
      this._imageWidth = width;
      this._imageHeight = height;
      this._imageChanged = true;
      if (!this._buttons.length) this._addButton();
    } catch (err: any) {
      showToast(this, err.message || "Unable to load image");
    }
  }

  private _readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  private _loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Unable to read image"));
      img.src = src;
    });
  }

  private _svgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const transformed = point.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
  }

  private _startDrag(e: PointerEvent, idx: number, mode: "move" | "resize") {
    e.preventDefault();
    e.stopPropagation();
    this._recordHistory();
    this._selectedButton = idx;
    const svg = (e.currentTarget as SVGElement).ownerSVGElement;
    if (!svg) return;
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    const start = this._svgPoint(svg, e.clientX, e.clientY);
    this._drag = {
      idx,
      mode,
      start,
      origin: { ...this._buttons[idx], actions: this._buttons[idx].actions.map((a) => ({ ...a, conditions: [...a.conditions] })), conditions: [...this._buttons[idx].conditions] },
    };
  }

  private _onPointerMove(e: PointerEvent) {
    if (!this._drag) return;
    const svg = this.renderRoot.querySelector(".preview svg") as SVGSVGElement | null;
    if (!svg) return;

    const point = this._svgPoint(svg, e.clientX, e.clientY);
    const { idx, mode, start, origin } = this._drag;
    const dx = point.x - start.x;
    const dy = point.y - start.y;

    if (mode === "move") {
      if (origin.shape === "path") {
        if (origin.d) {
          this._updateButton(idx, { d: this._translatePath(origin.d, dx, dy) });
        }
      } else {
        this._updateButton(idx, {
          x: Math.max(0, Math.round(origin.x + dx)),
          y: Math.max(0, Math.round(origin.y + dy)),
        });
      }
      return;
    }

    // resize (paths have no resize handle)
    if (origin.shape === "circle") {
      const radius = Math.max(8, Math.round(origin.width + dx));
      this._updateButton(idx, { width: radius });
    } else if (origin.shape === "rectangle") {
      const height = origin.height || origin.width;
      this._updateButton(idx, {
        width: Math.max(10, Math.round(origin.width + dx)),
        height: Math.max(10, Math.round(height + dy)),
      });
    }
  }

  // Shift only absolute coordinates of an SVG path; relative commands are deltas
  // and must stay untouched. The very first moveto is always treated as absolute.
  private _translatePath(d: string, dx: number, dy: number): string {
    const commandRe = /([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g;
    const numRe = /-?\d*\.?\d+(?:[eE][-+]?\d+)?/g;
    const roles: Record<string, ("x" | "y" | "o")[]> = {
      M: ["x", "y"], L: ["x", "y"], T: ["x", "y"],
      H: ["x"], V: ["y"],
      C: ["x", "y", "x", "y", "x", "y"],
      S: ["x", "y", "x", "y"], Q: ["x", "y", "x", "y"],
      A: ["o", "o", "o", "o", "o", "x", "y"],
      Z: [],
    };
    let out = "";
    let first = true;
    let m: RegExpExecArray | null;
    while ((m = commandRe.exec(d))) {
      const cmd = m[1];
      const upper = cmd.toUpperCase();
      const isAbsolute = cmd === upper;
      const pattern = roles[upper] || [];
      const nums = (m[2].match(numRe) || []).map(Number);
      if (pattern.length === 0) {
        out += cmd + " ";
      } else {
        const shifted = nums.map((value, i) => {
          const role = pattern[i % pattern.length];
          const firstPair = first && upper === "M" && i < 2;
          if (isAbsolute || firstPair) {
            if (role === "x") return value + dx;
            if (role === "y") return value + dy;
          }
          return value;
        });
        out += cmd + shifted.join(" ") + " ";
      }
      first = false;
    }
    return out.trim();
  }

  private _isValidPath(d: string): boolean {
    if (!d || !d.trim()) return false;
    if (!/^\s*[Mm]/.test(d)) return false;
    return /^[MmLlHhVvCcSsQqTtAaZz0-9eE,.\s+-]+$/.test(d);
  }

  private _changeShape(idx: number, shape: EditableButton["shape"]) {
    this._recordHistory();
    const btn = this._buttons[idx];
    const patch: Partial<EditableButton> = { shape };
    if (shape === "path" && !btn.d) {
      const cx = btn.x || Math.round(this._imageWidth / 2);
      const cy = btn.y || Math.round(this._imageHeight / 2);
      const r = btn.width || 15;
      patch.d = `M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
    }
    this._updateButton(idx, patch);
  }

  private _onPointerUp() {
    this._drag = undefined;
  }

  private _cloneButton(button: EditableButton, offset = 20): EditableButton {
    return {
      shape: button.shape,
      x: button.x + offset,
      y: button.y + offset,
      width: button.width,
      height: button.height,
      d: button.d && button.shape === "path" ? this._translatePath(button.d, offset, offset) : button.d,
      conditions: button.conditions.map((c) => ({ ...c })),
      actions: button.actions.map((a) => ({
        title: a.title,
        conditions: a.conditions.map((c) => ({ ...c })),
      })),
    };
  }

  private _addButton() {
    this._recordHistory();
    const size = Math.max(30, Math.round(Math.min(this._imageWidth || 120, this._imageHeight || 120) / 8));
    const next: EditableButton = {
      shape: "rectangle",
      x: Math.max(0, Math.round((this._imageWidth - size) / 2)),
      y: Math.max(0, Math.round((this._imageHeight - size) / 2)),
      width: size,
      height: size,
      conditions: [],
      actions: [{ title: "press", conditions: [] }],
    };
    this._buttons = [...this._buttons, next];
    this._selectedButton = this._buttons.length - 1;
  }

  private _copyPreviousButton() {
    this._recordHistory();
    const sourceIdx = this._selectedButton > 0 ? this._selectedButton - 1 : this._buttons.length - 1;
    if (sourceIdx < 0 || !this._buttons[sourceIdx]) {
      showToast(this, "No previous button to copy");
      return;
    }
    const copy = this._cloneButton(this._buttons[sourceIdx]);
    this._buttons = [...this._buttons, copy];
    this._selectedButton = this._buttons.length - 1;
    showToast(this, `Copied button ${sourceIdx + 1}`);
  }

  private _removeButton(idx: number) {
    this._recordHistory();
    this._buttons = this._buttons.filter((_btn, i) => i !== idx);
    this._selectedButton = Math.max(0, Math.min(this._selectedButton, this._buttons.length - 1));
  }

  private _updateButton(idx: number, patch: Partial<EditableButton>) {
    this._buttons = this._buttons.map((btn, i) => (i === idx ? { ...btn, ...patch } : btn));
  }

  private _addAction(buttonIdx: number) {
    this._recordHistory();
    const btn = this._buttons[buttonIdx];
    this._updateButton(buttonIdx, {
      actions: [...btn.actions, { title: "press", conditions: [] }],
    });
  }

  private _removeAction(buttonIdx: number, actionIdx: number) {
    this._recordHistory();
    const btn = this._buttons[buttonIdx];
    this._updateButton(buttonIdx, {
      actions: btn.actions.filter((_action, idx) => idx !== actionIdx),
    });
  }

  private _updateAction(buttonIdx: number, actionIdx: number, patch: Partial<EditableAction>) {
    const btn = this._buttons[buttonIdx];
    this._updateButton(buttonIdx, {
      actions: btn.actions.map((action, idx) => (idx === actionIdx ? { ...action, ...patch } : action)),
    });
  }

  private _buildBlueprint(): Omit<Blueprint, "id" | "has_image" | "editable"> {
    const buttons: BlueprintButton[] = this._buttons.map((button) => {
      const result: any = {
        conditions: this._cleanConditions(button.conditions),
        actions: button.actions.map((action) => ({
          title: action.title.trim(),
          conditions: this._cleanConditions(action.conditions),
        })),
      };
      if (this._buttons.length > 1) {
        if (button.shape === "path") {
          if (button.d) result.d = button.d.trim();
        } else {
          result.x = button.x;
          result.y = button.y;
          result.width = button.width;
          if (button.shape === "rectangle") result.height = button.height || button.width;
        }
      }
      return result;
    });

    const blueprint: any = {
      name: this._name.trim(),
      service: this._service.trim(),
      event_type: this._eventType.trim(),
      buttons,
    };
    if (this._eventType === "mqtt") {
      if (this._mqttTopicFormat.trim()) blueprint.mqtt_topic_format = this._mqttTopicFormat.trim();
      if (this._mqttSubTopics) blueprint.mqtt_sub_topics = true;
    } else {
      blueprint.identifier_key = this._identifierKey.trim();
    }
    return blueprint;
  }

  private _cleanConditions(conditions: EditableCondition[]) {
    return conditions
      .filter((condition) => condition.key.trim() && condition.value.trim())
      .map((condition) => ({
        key: condition.key.trim(),
        value: condition.value.trim(),
      }));
  }

  private async _save() {
    this._error = undefined;
    if (!this._imageDataUrl) {
      this._error = "Upload a remote image before saving.";
      return;
    }
    if (!this._buttons.length) {
      this._error = "Add at least one button before saving.";
      return;
    }
    if (this._buttons.some((button) => !button.actions.length || button.actions.some((action) => !action.title.trim()))) {
      this._error = "Each button needs at least one titled action.";
      return;
    }
    if (this._buttons.some((button) => button.shape === "path" && (!button.d || !this._isValidPath(button.d)))) {
      this._error = "One or more custom path buttons have an invalid SVG path.";
      return;
    }

    this._saving = true;
    try {
      const payload: Record<string, unknown> = {
        id: this._id,
        blueprint: this._buildBlueprint(),
        overwrite: this._isEdit,
      };
      if (!this._isEdit || this._imageChanged) {
        payload.image = this._imageDataUrl;
      }

      const res = await this.hass.callWS<SaveBlueprintResponse>({
        type: wsType("blueprint/save"),
        payload,
      });
      showToast(this, this._isEdit ? "Blueprint Updated" : "Blueprint Saved");
      this._baselineSnapshot = this._snapshot();
      this._clearHistory();
      navigate(navigateTo(`new/${res.blueprint_id}`));
    } catch (err: any) {
      this._error = err.message || "Unable to save blueprint.";
    } finally {
      this._saving = false;
    }
  }

  private _snapshot(): EditorSnapshot {
    return {
      id: this._id,
      name: this._name,
      service: this._service,
      eventType: this._eventType,
      identifierKey: this._identifierKey,
      mqttTopicFormat: this._mqttTopicFormat,
      mqttSubTopics: this._mqttSubTopics,
      imageDataUrl: this._imageDataUrl,
      imageWidth: this._imageWidth,
      imageHeight: this._imageHeight,
      imageChanged: this._imageChanged,
      buttons: JSON.parse(JSON.stringify(this._buttons)),
      selectedButton: this._selectedButton,
    };
  }

  private _restoreSnapshot(snapshot: EditorSnapshot) {
    this._restoringHistory = true;
    this._id = snapshot.id;
    this._name = snapshot.name;
    this._service = snapshot.service;
    this._eventType = snapshot.eventType;
    this._identifierKey = snapshot.identifierKey;
    this._mqttTopicFormat = snapshot.mqttTopicFormat;
    this._mqttSubTopics = snapshot.mqttSubTopics;
    this._imageDataUrl = snapshot.imageDataUrl;
    this._imageWidth = snapshot.imageWidth;
    this._imageHeight = snapshot.imageHeight;
    this._imageChanged = snapshot.imageChanged;
    this._buttons = JSON.parse(JSON.stringify(snapshot.buttons));
    this._selectedButton = snapshot.selectedButton;
    this._restoringHistory = false;
  }

  private _syncHistoryFlags() {
    this._canUndo = this._undoStack.length > 0;
    this._canRedo = this._redoStack.length > 0;
  }

  private _clearHistory() {
    this._undoStack = [];
    this._redoStack = [];
    this._syncHistoryFlags();
    this._updateDirty();
  }

  private _updateDirty() {
    this._dirty = JSON.stringify(this._snapshot()) !== JSON.stringify(this._baselineSnapshot);
  }

  private _recordHistory() {
    if (this._restoringHistory || this._drag) return;
    this._undoStack.push(this._snapshot());
    if (this._undoStack.length > MAX_HISTORY) this._undoStack.shift();
    this._redoStack = [];
    this._updateDirty();
    this._syncHistoryFlags();
  }

  private _recordHistoryForText() {
    if (!this._textHistoryPending) {
      this._recordHistory();
      this._textHistoryPending = true;
    }
    if (this._historyDebounce) clearTimeout(this._historyDebounce);
    this._historyDebounce = setTimeout(() => {
      this._textHistoryPending = false;
    }, 800);
  }

  private _undo() {
    if (!this._undoStack.length) return;
    this._redoStack.push(this._snapshot());
    const snapshot = this._undoStack.pop()!;
    this._restoreSnapshot(snapshot);
    this._updateDirty();
    this._syncHistoryFlags();
  }

  private _redo() {
    if (!this._redoStack.length) return;
    this._undoStack.push(this._snapshot());
    const snapshot = this._redoStack.pop()!;
    this._restoreSnapshot(snapshot);
    this._updateDirty();
    this._syncHistoryFlags();
  }

  private _onBeforeUnload(e: BeforeUnloadEvent) {
    if (!this._dirty) return;
    e.preventDefault();
    e.returnValue = "";
  }

  private _onPopState() {
    if (!this._dirty) return;
    history.pushState(null, "", this._leavePath);
    this._confirmDiscard(() => navigate(navigateTo()));
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (!(e.ctrlKey || e.metaKey)) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
      return;
    }
    if (e.key === "z" || e.key === "Z") {
      e.preventDefault();
      if (e.shiftKey) this._redo();
      else this._undo();
    } else if (e.key === "y" || e.key === "Y") {
      e.preventDefault();
      this._redo();
    }
  }

  private _confirmDiscard(onConfirm: () => void) {
    if (!this._dirty) {
      onConfirm();
      return;
    }
    showDialog(this, "switch-manager-dialog-confirm", () => import("./dialogs/confirm"), {
      title: "Discard unsaved changes?",
      text: "Your blueprint changes will be lost if you leave without saving.",
      confirmText: "Discard",
      dismissText: "Stay",
      destructive: true,
      confirm: () => {
        this._clearHistory();
        onConfirm();
      },
    });
  }

  private _slug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  private _back() {
    this._confirmDiscard(() => navigate(navigateTo()));
  }

  static styles = css`
    :host {
      display: block;
    }
    .loading {
      padding: 24px;
      color: var(--secondary-text-color);
    }
    .toolbar {
      display: flex;
      align-items: center;
      height: var(--header-height, 56px);
      box-sizing: border-box;
      padding: 0 12px;
      background-color: var(--app-header-background-color, var(--primary-color));
      color: var(--app-header-text-color, var(--text-primary-color, #fff));
      font-size: 20px;
      font-weight: 400;
    }
    .main-title {
      flex: 1;
      margin: 0 16px;
    }
    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .version {
      font-size: 14px;
      opacity: 0.8;
    }
    .view {
      display: block;
      height: calc(100vh - var(--header-height, 56px));
      overflow-y: auto;
    }
    .grid {
      display: grid;
      grid-template-columns: minmax(280px, 1fr) minmax(320px, 520px);
      gap: 16px;
      padding: 16px;
    }
    .card {
      background: var(--card-background-color, var(--ha-card-background, var(--secondary-background-color)));
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 16px;
      box-sizing: border-box;
    }
    h2, h3 {
      margin: 0 0 12px;
      font-weight: 500;
    }
    .hint, .dimensions {
      color: var(--secondary-text-color);
      font-size: 0.9rem;
    }
    .file-picker {
      display: inline-block;
      margin: 8px 0 16px;
      cursor: pointer;
    }
    .preview {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 320px;
      touch-action: none;
    }
    svg {
      max-width: 100%;
      max-height: 520px;
      overflow: visible;
      user-select: none;
    }
    svg image {
      filter: drop-shadow(0px 0px 8px #00000033);
      pointer-events: none;
    }
    svg .button {
      fill: #00000000;
      stroke: #00adff80;
      stroke-width: 3;
      cursor: grab;
      touch-action: none;
    }
    svg .button.selected {
      fill: #6bd3ff75;
      stroke: #0082e9;
      cursor: grabbing;
    }
    svg .resize-handle {
      fill: #0082e9;
      stroke: #fff;
      stroke-width: 2;
      cursor: nwse-resize;
      touch-action: none;
    }
    .empty-preview {
      min-height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
      border: 1px dashed var(--divider-color);
      border-radius: 10px;
    }
    .fields {
      display: grid;
      gap: 12px;
    }
    .fields.two {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
    }
    label.checkbox {
      flex-direction: row;
      align-items: center;
      color: var(--primary-text-color);
    }
    input, select, textarea {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font: inherit;
      padding: 8px;
    }
    textarea {
      font-family: var(--code-font-family, monospace);
      font-size: 0.85rem;
      resize: vertical;
    }
    .path-field {
      margin-top: 12px;
    }
    .path-error {
      color: var(--error-color);
      font-size: 0.85rem;
      margin: 4px 0 0;
    }
    input:disabled {
      opacity: 0.7;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 20px;
    }
    .section-header.compact {
      margin: 12px 0;
    }
    .header-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .button-tabs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 12px 0;
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      padding: 8px 12px;
      font: inherit;
      cursor: pointer;
    }
    button.selected, button.primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color);
    }
    button.danger {
      color: var(--error-color);
    }
    button.icon-only {
      padding: 8px;
    }
    button:disabled {
      opacity: 0.6;
      cursor: default;
    }
    .conditions {
      display: grid;
      gap: 8px;
      margin-bottom: 12px;
    }
    .condition {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 8px;
      align-items: end;
    }
    .action-editor {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 12px;
      margin: 8px 0;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 24px;
    }
    ha-alert {
      display: block;
      margin: 0 0 12px;
    }
    ha-svg-icon {
      width: 18px;
      height: 18px;
    }
    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr;
      }
      .fields.two, .condition {
        grid-template-columns: 1fr;
      }
    }
  `;
}
