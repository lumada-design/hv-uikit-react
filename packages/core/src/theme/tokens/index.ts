import { commonColors, darkColors, lightColors } from "./colors";
import { fontSizes } from "./typography";

export const baseTokens = {
  colors: {
    ...commonColors,
    ...lightColors,
  },
  fontSizes,
};

export const darkTokens = {
  colors: darkColors,
};
