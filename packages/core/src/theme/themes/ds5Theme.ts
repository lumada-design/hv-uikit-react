import { baseTokens, darkTokens } from "../tokens";

const { colors: baseColors } = baseTokens;
const { colors: darkColors } = darkTokens;

const theme = {
  ...baseTokens,
  colors: {
    modes: {
      dawn: {
        ...darkColors,
      },
      wicked: {
        ...baseColors,
      },
      wild: {
        acce1: "orange",
        atmo1: "white",
      },
    },
  },
  spacing: { base: 20 },
};

export default theme;
