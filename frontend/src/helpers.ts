import { Blueprint, SwitchConfig } from "./types";

export const DOMAIN = "switch_manager";
export const SCRIPT_MODES = ["single", "restart", "queued", "parallel"];

export function navigateTo(path?: string): string {
  return path ? `/${DOMAIN}/${path}` : `/${DOMAIN}`;
}

export function assetUrl(file: string): string {
  return `/assets/${DOMAIN}/${file}`;
}

export function wsType(type: string): string {
  return `${DOMAIN}/${type}`;
}

export function navigate(path: string): void {
  history.pushState(null, "", path);
  const event = new Event("location-changed");
  window.dispatchEvent(event);
}

export function createEmptyConfig(blueprint: Blueprint): SwitchConfig {
  const config: SwitchConfig = {
    id: null,
    name: "New Switch",
    enabled: true,
    identifier: "",
    blueprint: blueprint,
    valid_blueprint: true,
    buttons: [],
    is_mismatch: false,
    rotate: 0,
  };

  blueprint.buttons.forEach((btn, btnIdx) => {
    config.buttons[btnIdx] = { actions: [] };
    btn.actions.forEach((_action, actIdx) => {
      config.buttons[btnIdx].actions[actIdx] = {
        mode: SCRIPT_MODES[0],
        sequence: [],
      };
    });
  });

  return config;
}

export function fireEvent(
  node: HTMLElement,
  type: string,
  detail?: unknown
): void {
  const event = new CustomEvent(type, {
    bubbles: true,
    composed: true,
    detail,
  });
  node.dispatchEvent(event);
}

// Tell HA's dialog manager that a dialog closed. HA keeps a stack of open
// dialogs plus a history entry per dialog; without this event the stack grows
// with every dialog we open and a later HA navigation closes all of them at
// once (#76). Must be fired after any follow-up dialog has been shown, so the
// history state already points at the new dialog.
export function notifyDialogClosed(node: HTMLElement): void {
  fireEvent(node, "dialog-closed", { dialog: node.localName });
}

export function showToast(node: HTMLElement, message: string): void {
  fireEvent(node, "hass-notification", { message });
}

export function showDialog(
  node: HTMLElement,
  dialogTag: string,
  dialogImport: () => Promise<unknown>,
  dialogParams: Record<string, unknown>
): void {
  fireEvent(node, "show-dialog", {
    dialogTag,
    dialogImport,
    dialogParams,
  });
}
