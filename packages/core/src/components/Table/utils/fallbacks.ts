const LONG_DASH = "—";

export const hvStringFallback = (value) => {
  return typeof value === "string" && value !== "" ? value : LONG_DASH;
};

export const hvNumberFallback = (value) => {
  return typeof value === "number" ? value : LONG_DASH;
};

export const hvNodeFallback = (value) => {
  if (!value) return LONG_DASH;
  return hvStringFallback(value?.toString()) === LONG_DASH ? LONG_DASH : value;
};
