import { colors, fontSizes, lineHeights, spacing, border } from "./tokens";
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
  border,
  spacing,
};

export const makeTheme = (obj = {}) => mergeTheme(baseTheme, obj);
