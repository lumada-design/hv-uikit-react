export type HvBreakpoints = "xs" | "sm" | "md" | "lg" | "xl";

/** @experimental extendable theme breakpoints */
export interface HvThemeBreakpoints {
  unit: string;
  step: number;
  values: Record<HvBreakpoints, number>;
}

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
} satisfies HvThemeBreakpoints;
