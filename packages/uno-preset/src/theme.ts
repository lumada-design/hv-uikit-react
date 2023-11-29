import type { Theme } from "@unocss/preset-uno";
import { ThemeExtender } from "@unocss/core";

import {
  ds5 as hvTheme,
  theme as hvThemeCssVars,
} from "@hitachivantara/uikit-styles";

// #region HV utils
const { colors: colorVars } = hvThemeCssVars;

/** HV breakpoints with added `px` suffix */
const hvBreakpoints = Object.entries(hvTheme.breakpoints.values).map(
  ([key, value]) => [key, `${value}px`] as const
);
// #endregion

const borderRadius = {
  DEFAULT: hvTheme.radii.round,
  ...hvTheme.radii,
};

const breakpoints = Object.fromEntries(hvBreakpoints);
const containers = Object.fromEntries(
  hvBreakpoints.map(([k, v]) => [k, `(min-width: ${v})`])
);

const { base, ...hvSpacing } = hvTheme.space;
const spacing = {
  DEFAULT: hvSpacing.sm,
  ...hvSpacing,
};

const hvZIndex = Object.entries(hvTheme.zIndices).map(
  ([key, value]) => [key, `${value}`] as const
);
const zIndex = Object.fromEntries(hvZIndex);

/** Extends the current theme with the NEXT Design System utilities */
export const extendTheme: ThemeExtender<Theme> = (baseTheme) => ({
  ...baseTheme,
  borderRadius,
  breakpoints,
  containers,
  spacing,
  zIndex,

  // colors
  colors: {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000000",
    white: "#ffffff",
    // using `theme` CSS vars for automatic theme switching, losing alpha + no HvProvider support
    ...colorVars,
  },
  accentColor: { DEFAULT: colorVars.primary },
  textColor: { DEFAULT: colorVars.secondary },
  backgroundColor: { DEFAULT: colorVars.backgroundColor },

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
