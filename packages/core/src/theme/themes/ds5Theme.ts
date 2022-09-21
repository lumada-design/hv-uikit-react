import { makeTheme, colors } from "theme";

const theme = makeTheme({
  colors: {
    modes: {
      wicked: {
        ...colors.dark,
      },
      dawn: {
        ...colors.light,
      },
      wild: {
        acce1: "orange",
        atmo1: "white",
      },
    },
  },
  spacing: {
    base: 20,
  },
});

export default theme;
