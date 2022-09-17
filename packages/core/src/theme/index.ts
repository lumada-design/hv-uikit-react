import { toVarNames } from "./utils";
import * as Themes from "./themes";

export const themes = { ...Themes };

const defaultTheme = Object.values(themes)[0];
const defaultColorMode = Object.values(defaultTheme.colors.modes)[0];

export const themeVars = toVarNames({
  ...defaultTheme,
  colors: defaultColorMode,
});

export * from "./utils";
export * from "./cssReset";
