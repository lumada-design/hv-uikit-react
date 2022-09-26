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
        acce1: "orange",
        atmo1: "white",
      },
    },
  },
  spacing: {
    base: 20,
  },
  border: {
    radius: "10px",
  },
});

export default theme;
