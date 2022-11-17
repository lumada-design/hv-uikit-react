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
      color: theme.colors.acce1,
      height: "64px",
      selectedItemBorderTopColor: "transparent",
      selectedItemBorderTopThickness: "0px",
      selectedItemBorderBottomColor: theme.colors.acce1,
      selectedItemBorderBottomThickness: "4px",
      selectedItemBorderTop: "none",
      selectedItemBorderBottom: `4px solid black`,
      shadow: "none",
    },
  },
}));

export default ds5Theme;
