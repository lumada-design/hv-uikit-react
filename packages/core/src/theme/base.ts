import * as tokens from "./tokens";
import { toThemeVars } from "./utils";

export const baseTheme = {
  ...tokens,
  colors: {
    common: tokens.colors.common,
    modes: {
      light: { ...tokens.colors.light },
      dark: { ...tokens.colors.dark },
    },
  },
};

export const baseThemeVars = toThemeVars({
  ...baseTheme,
  colors: {
    ...baseTheme.colors.common,
    ...Object.values(baseTheme.colors.modes)[0],
  },
});

export const baseComponents = {
  dropdown: {
    borderRadius: baseThemeVars.radii.xs,
  },
  header: {
    height: 44,
    borderTop: `4px solid ${baseThemeVars.colors.sema4}`,
  },
};

export const baseComponentsVars = toThemeVars({
  ...baseComponents,
});
