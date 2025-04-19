import { componentsSpec } from "../types/components";
import { typographySpec } from "../types/typography";
import { mapCSSVars } from "../utils/cssVars";
import { dark, light } from "./colorModes";
import { base, categorical } from "./colors";
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
    ...base,
    ...categorical,
    ...light,
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
