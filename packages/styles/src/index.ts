import ds3 from "./themes/ds3";
import ds5 from "./themes/ds5";
import pentahoPlus from "./themes/pentahoPlus";

export const themes = { ds3, ds5, pentahoPlus };
export { ds3, ds5, pentahoPlus };

// Baseline & Theme Tokens
export * from "./CssBaseline";
export * from "./theme/base";
export * from "./theme/colors";
export * from "./theme/colorModes";
export * from "./theme/designTokens";

// Types
export * from "./types/color";
export * from "./types/theme";
export * from "./types/components";
export * from "./types/typography";

// Utilities
export { getColor } from "./utils/color";
export {
  mergeTheme,
  getTheme,
  getMode,
  getThemesVars,
  applyTheme,
} from "./utils/theme";
