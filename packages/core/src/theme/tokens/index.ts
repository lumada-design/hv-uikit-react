import { commonColors, darkColors, lightColors } from "./colors";
import { spacing } from "./spacing";
import { fontSizes, lineHeights } from "./typography";

export const baseTokens = {
  colors: {
    ...commonColors,
    ...lightColors,
  },
  fontSizes,
  lineHeights,
  spacing,
};

export const darkTokens = {
  colors: { ...darkColors },
};
