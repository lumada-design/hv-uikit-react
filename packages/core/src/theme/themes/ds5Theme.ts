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
      orange: {
        ...colors.light,
        acce1: "orange",
        atmo1: "white",
      },
    },
  },
  components: {
    dropdown: {
      borderRadius: "0.25rem", // from vars
    },
    header: {
      height: "100px",
      borderTop: "none",
    },
  },
});

export default theme;
