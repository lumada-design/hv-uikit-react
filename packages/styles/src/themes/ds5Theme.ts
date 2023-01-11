import { colors, makeTheme } from "..";

const ds5Theme = makeTheme((theme) => ({
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
  breakpoints: {
    unit: "px",
    step: 5,
    values: {
      xs: 0,
      sm: 250,
      md: 500,
      lg: 725,
      xl: 1050,
    },
  },
  components: {
    dropdown: {
      borderRadius: theme.radii.sm,
    },
    button: {
      borderRadius: theme.radii.base,
      marginIconRight: "0px",
      marginIconLeft: "-8px",
      semanticColor: theme.colors.base2,
      semanticColorDisabled: theme.colors.base2,
    },
    header: {
      color: theme.colors.acce1,
      height: "64px",
      borderTopThickness: "0px",
      borderTopColor: "transparent",
      selectedItemBorderTopColor: "transparent",
      selectedItemBorderTopThickness: "0px",
      selectedItemBorderBottomColor: theme.colors.acce1,
      selectedItemBorderBottomThickness: "4px",
      shadow: "none",
    },
    tab: {
      letterSpacing: "0em",
      fontSize: "14px",
      lineHeight: "24px",
      padding: "0 16px",
      hoveredBackgroundColor: theme.colors.acce2s,
      hoveredBackgroundBorderRadius: "2px",
      hoveredUnderlineBackgroundColor: theme.colors.atmo4,
    },
  },
}));

export default ds5Theme;
