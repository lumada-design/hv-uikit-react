export const getFocusableChildren = (el) =>
  el?.querySelectorAll("input, button, select, textarea, a[href]") || [];

export const setFocusTo = (el) => {
  el.focus();
};
