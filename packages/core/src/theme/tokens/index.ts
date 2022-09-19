import { commonColors, darkColors, lightColors } from "./colors";
import { fontSizes, lineHeights } from "./typography";

export const baseTokens = {
  colors: {
    ...commonColors,
    ...lightColors,
  },
  fontSizes,
  lineHeights,
};

export const darkTokens = {
  colors: darkColors,
};
