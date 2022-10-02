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
  components: {
    header: {
      height: "100px",
      borderTop: "none",
    },
  },
});

export default theme;
