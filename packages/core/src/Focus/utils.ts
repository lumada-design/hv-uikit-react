export const getFocusableChildren = (el: any) =>
  el?.querySelectorAll("input, button, select, textarea, a[href]") || [];

export const setFocusTo = (el: any) => {
  el.focus();
};
