import * as tokens from "./tokens";
import { mergeTheme } from "./utils";

export const baseTheme = {
  ...tokens,
  colors: {
    ...tokens.colors.common,
    modes: {
      light: { ...tokens.colors.light },
      dark: { ...tokens.colors.dark },
    },
  },
};

export const makeTheme = (obj = {}) => mergeTheme(baseTheme, obj);
