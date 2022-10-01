import { extendTheme, colors } from "theme";

const theme = extendTheme({
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
});

export default theme;
