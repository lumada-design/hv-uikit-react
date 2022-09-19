import { baseTokens, darkTokens } from "../tokens";

const { colors: baseColors } = baseTokens;
const { colors: darkColors } = darkTokens;

const theme = {
  ...baseTokens,
  colors: {
    ...baseColors,
    modes: {
      light: {
        primary: baseColors.accent.acce1,
        background: baseColors.atmosphere.atmo1,
      },
      dark: {
        primary: darkColors.accent.acce1,
        background: darkColors.atmosphere.atmo1,
      },
    },
  },
};

export default theme;
