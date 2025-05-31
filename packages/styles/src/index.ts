import ds3 from "./themes/ds3";
import ds5 from "./themes/ds5";
import pentahoPlus from "./themes/pentahoPlus";

export * from "./palette";
export * from "./types";
export * from "./theme";
export * from "./makeTheme";
export * from "./utils";
export * from "./tokens";
export * from "./CssBaseline";

// Export each theme individually and a bundle of themes
export { ds3, ds5, pentahoPlus };
export const themes = { ds3, ds5, pentahoPlus };
