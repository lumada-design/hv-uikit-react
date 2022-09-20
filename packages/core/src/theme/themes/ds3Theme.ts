import { baseTokens, darkTokens } from "../tokens";

const { colors: baseColors } = baseTokens;
const { colors: darkColors } = darkTokens;

const theme = {
  ...baseTokens,
  colors: {
    modes: {
      light: {
        ...baseColors,
      },
      dark: {
        ...darkColors,
      },
    },
  },
};

export default theme;
