export const fontFamily = {
  body: "'Open Sans', Arial, Helvetica, sans-serif",
};

export const fontSizes = {
  xs: "10px",
  sm: "12px",
  base: "14px",
  lg: "16px",
  xl: "20px",
  xl2: "24px",
  xl3: "32px",
  xl4: "42px",
};

export const fontWeights = {
  hairline: "100",
  thin: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

export const lineHeights = {
  none: "21px",
  xs: "16px",
  sm: "18px",
  base: "21px",
  lg: "24px",
  xl: "30px",
  xl2: "36px",
  xl3: "48px",
  xl4: "63px",
};

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

export const radii = {
  none: "0px",
  base: "2px",
  round: "6px",
  large: "8px",
  /** @deprecated use `radii.full` instead */
  circle: "50%",
  full: "9999px",
};

export type HvRadius = keyof typeof radii;

// TODO - review these sizes in v6. Are they needed?
/** @deprecated no longer used. use `theme.space` or the direct value instead. */
export const sizes = {
  xs: "28px",
  sm: "32px",
  md: "36px",
  lg: "40px",
  xl: "44px",
};

export type HvSize = keyof typeof sizes;

export const space = {
  base: 8,
  xxs: "4px",
  xs: "8px",
  sm: "16px",
  md: "24px",
  lg: "48px",
  xl: "80px",
};

export const zIndices = {
  hide: -1,
  base: 0,
  docked: 10,
  sticky: 1000,
  fab: 1050,
  banner: 1100,
  overlay: 1200,
  modal: 1300,
  dropdown: 1400,
  popover: 1500,
  tooltip: 1600,
  skipLink: 1700,
  toast: 1800,
};
