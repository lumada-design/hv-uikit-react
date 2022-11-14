import { colors, makeTheme } from "..";

const ds5Theme = makeTheme((theme) => ({
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
      borderRadius: theme.radii.sm,
    },
    header: {
      height: "100px",
      borderTop: "none",
    },
  },
}));

export default ds5Theme;
