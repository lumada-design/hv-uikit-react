export type HvRadius = "none" | "base" | "round" | "large" | "circle" | "full";

/** @experimental */
export interface HvThemeRadii extends Record<HvRadius, string> {}

export const radii: HvThemeRadii = {
  none: "0px",
  base: "2px",
  round: "6px",
  large: "8px",
  /** @deprecated use `radii.full` instead */
  circle: "50%",
  full: "9999px",
};
