import { baseTokens, darkTokens } from "../tokens";

const { colors: baseColors, fontSizes } = baseTokens;
const { colors: darkColors } = darkTokens;

const theme = {
  colors: {
    modes: {
      dawn: {
        primary: darkColors.accent.acce1,
        background: darkColors.atmosphere.atmo1,
      },
      wicked: {
        primary: baseColors.accent.acce1,
        background: baseColors.atmosphere.atmo1,
      },
      soft: {
        primary: "orange",
        background: "white",
      },
    },
  },
  fontSizes,
};

export default theme;
