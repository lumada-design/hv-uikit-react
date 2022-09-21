import { colors, fontSizes, lineHeights, spacing } from "./tokens";
import { mergeTheme } from "./utils";

export const baseTheme = {
  colors: {
    ...colors.common,
    modes: {
      light: { ...colors.light },
      dark: { ...colors.dark },
    },
  },
  fontSizes,
  lineHeights,
  spacing,
};

export const makeTheme = (obj = {}) => mergeTheme(baseTheme, obj);
