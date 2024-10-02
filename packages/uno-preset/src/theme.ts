import { ThemeExtender } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";
import { ds5 as hvTheme } from "@hitachivantara/uikit-styles";

// #region theme conversion utils
const { dawn: defaultColors } = hvTheme.colors.modes;
const { base, ...hvSpacing } = hvTheme.space;

/** HV breakpoints with added `px` suffix */
const hvBreakpoints = Object.entries(hvTheme.breakpoints.values).map(
  ([key, value]) => [key, `${value}px`] as const,
);

const hvZIndex = Object.entries(hvTheme.zIndices).map(
  ([key, value]) => [key, `${value}`] as const,
);
// #endregion

/** Extends the current theme with the NEXT Design System utilities */
export const extendTheme: ThemeExtender<Theme> = (baseTheme) => ({
  ...baseTheme,

  borderRadius: {
    DEFAULT: hvTheme.radii.base,
    ...hvTheme.radii,
  },
  breakpoints: Object.fromEntries(hvBreakpoints),
  containers: Object.fromEntries(
    hvBreakpoints.map(([k, v]) => [k, `(min-width: ${v})`]),
  ),
  spacing: {
    DEFAULT: hvSpacing.xs,
    ...hvSpacing,
  },
  zIndex: Object.fromEntries(hvZIndex),

  // colors
  colors: {
    ...baseTheme.colors,
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000000",
    white: "#ffffff",
    // using `theme` CSS vars for automatic theme switching, losing alpha + no HvProvider support
    ...defaultColors,
  },
  accentColor: { DEFAULT: defaultColors.primary },
  textColor: { DEFAULT: defaultColors.secondary },
  backgroundColor: { DEFAULT: defaultColors.backgroundColor },

  // typography
  fontFamily: {
    body: hvTheme.fontFamily.body,
    sans: hvTheme.fontFamily.body,
    serif: hvTheme.fontFamily.body,
    mono: "monospace",
  },
  lineHeight: { DEFAULT: hvTheme.lineHeights.base, ...hvTheme.lineHeights },
  fontSize: { DEFAULT: hvTheme.fontSizes.base, ...hvTheme.fontSizes },
  fontWeight: { DEFAULT: hvTheme.fontWeights.normal, ...hvTheme.fontWeights },
});

/** UI Kit theme mode variants */
export const themeModes = {
  light: {
    colors: {
      ...hvTheme.colors.modes.dawn,
    },
  },
  dark: {
    colors: {
      ...hvTheme.colors.modes.wicked,
    },
  },
};
