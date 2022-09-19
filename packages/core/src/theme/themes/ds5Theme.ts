import { baseTokens, darkTokens } from "../tokens";

const { colors: baseColors } = baseTokens;
const { colors: darkColors } = darkTokens;

const theme = {
  ...baseTokens,
  colors: {
    ...baseColors,
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
};

export default theme;
