import * as tokens from "./tokens";
import { toThemeVars, mergeTheme } from "./utils";

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
    borderRadius: "none",
  },
  header: {
    height: 44,
    borderTop: `4px solid ${baseThemeVars.colors.sema4}`,
  },
};

export const baseComponentsVars = toThemeVars({
  ...baseComponents,
});

export const makeTheme = (overrides: any = {}) => {
  const { components, ...theme } = mergeTheme(baseTheme, {
    ...overrides,
    ...baseComponents,
    ...overrides.components,
  });

  return theme;
};
