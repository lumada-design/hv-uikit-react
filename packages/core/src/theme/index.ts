import { baseTheme } from "./base";
import { toThemeVars } from "./utils";

export { variant as themeVariant } from "@styled-system/variant";

export const themeVars = toThemeVars({
  ...baseTheme,
  colors: {
    ...baseTheme.colors.common,
    ...Object.values(baseTheme.colors.modes)[0],
  },
  space: baseTheme.space,
});

export const themeUtils = {
  space: (factor: number): string =>
    `calc(${themeVars.space.base} * ${factor}px)`,
};

export * as hvThemes from "./themes";

export * from "./tokens";
export * from "./base";
export * from "./CssBaseline";
