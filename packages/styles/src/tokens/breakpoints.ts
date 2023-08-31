export const breakpoints = {
  unit: "px",
  step: 5,
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1270,
    xl: 1920,
  },
};

export type HvBreakpoints = keyof typeof breakpoints.values;
