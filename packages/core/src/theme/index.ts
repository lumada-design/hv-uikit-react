import { baseTheme } from "./base";
import { toThemeVars } from "./utils";

export { variant as themeVariant } from "@styled-system/variant";

export const themeVars = toThemeVars({
  ...baseTheme,
  colors: { ...Object.values(baseTheme.colors.modes)[0] },
  spacing: baseTheme.spacing,
});

export const spacingFn = (factor: number): string =>
  `calc(${themeVars.spacing.base} * ${factor}px)`;

export * as hvThemes from "./themes";
export * from "./tokens";
export * from "./base";
export * from "./cssReset";
