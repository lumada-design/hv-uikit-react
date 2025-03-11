export const radii = {
  none: "0px",
  base: "2px",
  round: "6px",
  /** @deprecated use `radii.full` instead */
  circle: "50%",
  full: "9999px",
};

export type HvRadius = keyof typeof radii;
