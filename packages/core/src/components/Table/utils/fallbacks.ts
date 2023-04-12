const LONG_DASH = "—";

export const hvStringFallback = (value: any) => {
  return typeof value === "string" && value !== "" ? value : LONG_DASH;
};

export const hvNumberFallback = (value: any) => {
  return typeof value === "number" ? value : LONG_DASH;
};

export const hvNodeFallback = (value: any) => {
  if (!value) return LONG_DASH;
  return hvStringFallback(value?.toString()) === LONG_DASH ? LONG_DASH : value;
};
