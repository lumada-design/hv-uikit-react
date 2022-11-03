import { colors, makeTheme } from "theme";

const theme = makeTheme((themeVars) => ({
  colors: {
    modes: {
      light: {
        ...colors.common,
        ...colors.light,
      },
      dark: {
        ...colors.common,
        ...colors.dark,
      },
      orange: {
        ...colors.common,
        ...colors.light,
        acce1: "orange",
        atmo1: "white",
      },
    },
  },
  components: {
    dropdown: {
      borderRadius: themeVars.radii.lg,
    },
    header: {
      height: "100px",
      borderTop: "none",
      shadow: "none",
    },
    tag: {
      borderRadius: themeVars.radii.md,
    },
  },
}));

export default theme;
