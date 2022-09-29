import { makeTheme, colors } from "theme";

const theme = makeTheme({
  colors: {
    modes: {
      wicked: {
        ...colors.light,
      },
      dawn: {
        ...colors.dark,
      },
      wild: {
        ...colors.light,
        acce1: "orange",
        atmo1: "white",
      },
    },
  },
  space: {
    base: 12,
  },
});

export default theme;
