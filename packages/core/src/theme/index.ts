import { baseComponentsVars, baseThemeVars } from "./base";

export { variant as themeVariant } from "@styled-system/variant";
export { makeTheme } from "./utils";

export const themeVars = { ...baseThemeVars, ...baseComponentsVars };

export const themeUtils = {
  space: (factor: number): string =>
    `calc(${themeVars.space.base} * ${factor}px)`,
};

export * as hvThemes from "./themes";

export * from "./tokens";
export * from "./CssBaseline";
