import * as tokens from "./tokens";
import { mergeTheme } from "./utils";

export const baseTheme = {
  ...tokens,
  colors: {
    common: tokens.colors.common,
    modes: {
      light: { ...tokens.colors.light },
      dark: { ...tokens.colors.dark },
    },
  },
};

export const extendTheme = (obj = {}) => mergeTheme(baseTheme, obj);
