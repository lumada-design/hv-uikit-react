import { isKeypress } from "utils";

export const isKey = (evt, key) => isKeypress(evt, key);

export const isOneOfKeys = (evt, keys) => keys.some((key) => isKey(evt, key));

export const getFocusableChildren = (el) =>
  el.querySelectorAll("input, button, select, textarea, a[href]") || [];

export const setFocusTo = (el) => {
  el.focus();
};
