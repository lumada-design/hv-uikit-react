import { baseComponentsVars, baseThemeVars } from "./base";

export { variant as themeVariant } from "@styled-system/variant";

export { makeTheme } from "./base";

export const themeVars = { ...baseThemeVars, ...baseComponentsVars };

export const themeUtils = {
  space: (factor: number): string =>
    `calc(${themeVars.space.base} * ${factor}px)`,
};

export * as themes from "./themes";
export * from "./tokens";
export * from "./CssBaseline";
