import { componentsSpec } from "../types/components";
import { typographySpec } from "../types/typography";
import { alpha, mix } from "../utils/color";
import { mapCSSVars } from "../utils/cssVars";
import { spacing } from "../utils/spacing";
import { dark, light } from "./colorModes";
import { base, categorical, palette } from "./colors";
import * as designTokens from "./designTokens";

// TODO: Review in v6. Merge with base theme
export const colors = {
  common: {
    ...base,
    ...categorical,
  },
  light,
  dark,
};

/**
 * The base theme used as the foundation for all custom themes.
 */
export const baseTheme = {
  ...designTokens,
  colors: {
    ...colors.common,
    ...colors.light,
  },
};

/**
 * CSS variable mappings derived from the base theme.
 */
export const themeVars = mapCSSVars({
  ...baseTheme,
  ...componentsSpec,
  ...typographySpec,
});

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
