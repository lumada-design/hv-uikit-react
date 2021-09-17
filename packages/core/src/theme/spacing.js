const spacing = (theme) => (key) => {
  switch (typeof key) {
    case "string":
      return Number(theme.spacing[key]) || key;
    case "number":
      return 7.5 * key || 0;
    default:
      return 0;
  }
};

export const hvSpacing =
  (spacingFn) =>
  (...args) =>
    args
      .map(spacingFn)
      .map((s) => (typeof s === "number" ? `${s}px` : s))
      .join(" ");

export default spacing;
