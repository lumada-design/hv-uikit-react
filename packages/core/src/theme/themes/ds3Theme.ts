import { baseTokens, darkTokens } from "../tokens";

const { colors: baseColors, fontSizes } = baseTokens;
const { colors: darkColors } = darkTokens;

const theme = {
  colors: {
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
  fontSizes,
};

export default theme;
