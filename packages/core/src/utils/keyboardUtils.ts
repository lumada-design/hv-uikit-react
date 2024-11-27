/** Map of keys to key `code` @see https://mdn.io/event/code */
const keyboardCodes = {
  Backspace: "Backspace",
  Tab: "Tab",
  Enter: "Enter",
  Shift: "ShiftLeft",
  Ctrl: "ControlLeft",
  Alt: "AltLeft",
  Delete: "Delete",
  Esc: "Escape",
  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown",
  Space: "Space",
  PageUp: "PageUp",
  PageDown: "PageDown",
  Home: "Home",
  End: "End",
} as const;

type Key = keyof typeof keyboardCodes;

/** Check whether a keyboard `event` is pressing the `keyCode` key. */
export const isKey = (event: any, keyCode: Key) => {
  return event?.code === keyCode || event?.code === keyboardCodes[keyCode];
};

export const isOneOfKeys = (event: any, keys: Key[]) => {
  return keys.some((key) => isKey(event, key));
};

export function isDeleteKey(event: React.KeyboardEvent) {
  return isOneOfKeys(event, ["Backspace", "Delete"]);
}
