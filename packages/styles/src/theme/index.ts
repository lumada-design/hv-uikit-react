import { alpha, mix } from "../utils/color";
import { spacing } from "../utils/spacing";
import { themeVars } from "./base";
import { palette } from "./colors";

export * from "./base";
export * from "./colors";
export * from "./colorModes";
export * from "./designTokens";

/**
 * Final UI Kit static theme object.
 * Combines mapped variables with spacing and color utilities.
 *
 * @example
 * theme.colors.brand         // "var(--uikit-colors-brand)"
 * theme.spacing("xs", "sm")  // "var(--uikit-space-xs) var(--uikit-space-sm)"
 */
export const theme = {
  ...themeVars,
  palette,
  spacing,
  alpha,
  mix,
};

/** Final theme object with all tokens and utilities. */
export type HvTheme = typeof theme;
