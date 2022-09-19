import { baseTokens, darkTokens } from "../tokens";

const { colors: baseColors } = baseTokens;
const { colors: darkColors } = darkTokens;

const theme = {
  ...baseTokens,
  colors: {
    ...baseColors,
    modes: {
      dawn: {
        primary: darkColors.accent.acce2,
        background: darkColors.atmosphere.atmo2,
      },
      wicked: {
        primary: baseColors.accent.acce2,
        background: baseColors.atmosphere.atmo2,
      },
      soft: {
        primary: "orange",
        background: "white",
      },
    },
  },
  spacing: { base: 20 },
};

export default theme;
