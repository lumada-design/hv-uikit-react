import { theme1 } from "./themes";
import { toVarNames } from "./utils";

import * as Themes from "./themes";

export * from "./themes";
export * from "./utils";

export const localThemes = { ...Themes };
export const themeVars = toVarNames(theme1.light);

export { default as useTheme } from "./useTheme";
