import { baseTheme } from "./base";
import { getCSSVarsScale, toThemeVars } from "./utils";

export { variant as themeVariant } from "@styled-system/variant";

export const themeVars = toThemeVars({
  ...baseTheme,
  colors: { ...Object.values(baseTheme.colors.modes)[0] },
  spacing: {
    ...getCSSVarsScale(baseTheme.spacing.base, "spacing", 10, "px", false),
  },
});

export * as hvThemes from "./themes";
export * from "./tokens";
export * from "./base";
export * from "./cssReset";
