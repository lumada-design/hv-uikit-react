import { colors, makeTheme } from "..";

const theme = makeTheme((themeVars) => ({
  colors: {
    modes: {
      light: {
        ...colors.light,
      },
      dark: {
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
      borderRadius: themeVars.radii.sm,
    },
    header: {
      height: "100px",
      borderTop: "none",
    },
  },
}));

export default theme;
