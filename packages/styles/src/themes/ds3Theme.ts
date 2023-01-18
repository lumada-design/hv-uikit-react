import { colors, makeTheme } from "..";

const ds3Theme = makeTheme((theme) => ({
  colors: {
    modes: {
      dawn: { ...colors.common, ...colors.light },
      wicked: { ...colors.common, ...colors.dark },
    },
  },
  space: {
    base: 10,
    xs: "10px",
    sm: "20px",
    md: "30px",
    lg: "60px",
    xl: "90px",
  },
  components: {
    dropdown: {
      borderRadius: "none",
    },
    button: {
      borderRadius: theme.radii.base,
      marginIconRight: "0px",
      marginIconLeft: "-8px",
      semanticColor: "rgba(251, 252, 252, 0.3)",
      semanticColorDisabled: "rgba(251, 252, 252, 0.1)",
    },
    header: {
      color: theme.colors.sema4,
      height: "44px",
      borderTopThickness: "4px",
      borderTopColor: `${theme.colors.sema4}`,
      selectedItemBorderTopColor: theme.colors.acce3,
      selectedItemBorderTopThickness: "2px",
      selectedItemBorderBottomColor: "transparent",
      selectedItemBorderBottomThickness: "0px",
      shadow: theme.shadows.md,
    },
    card: {
      iconMargin: "-24px",
      outline: "none",
      borderRadius: "0px",
      hoverColor: theme.colors.atmo4,
    },
    tab: {
      letterSpacing: "0.02em",
      fontSize: "12px",
      lineHeight: "16px",
      padding: "0 20px",
      hoveredBackgroundColor: "transparent",
      hoveredBackgroundBorderRadius: "0px",
      hoveredUnderlineBackgroundColor: theme.colors.atmo5,
    },
    list: {
      hoverColor: theme.colors.atmo3,
      disabledBackgroundColor: "transparent",
    },
    dialog: {
      borderRadius: "0",
      margin: "100px",
    },
  },
}));

export default ds3Theme;
