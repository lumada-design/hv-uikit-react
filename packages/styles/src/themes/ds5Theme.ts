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
    card: {
      iconMargin: "0px",
      outline: `1px solid ${theme.colors.atmo4}`,
      borderRadius: "0px 0px 6px 6px",
      hoverColor: theme.colors.acce2,
    },
    tab: {
      letterSpacing: "0em",
      fontSize: "14px",
      lineHeight: "24px",
      padding: "0 16px",
      hoverBackgroundColor: theme.colors.acce2s,
      hoverBackgroundBorderRadius: "2px",
      hoverUnderlineBackgroundColor: theme.colors.atmo4,
    },
    list: {
      hoverColor: theme.colors.acce2s,
      disabledBackgroundColor: theme.colors.atmo3,
    },
    dialog: {
      borderRadius: "6px",
      margin: "80px",
    },
    baseCheckBox: {
      hoverColor: theme.colors.acce2s,
      borderRadius: "2px",
    },
    baseDropdown: {
      shadow: "none",
      placeholderColor: theme.colors.acce4,
      letterSpacing: "0em",
      fontSize: "14px",
      lineHeight: "24px",
      borderColor: theme.colors.acce4,
      hoverBorderColor: theme.colors.acce2,
      disabledBorderColor: theme.colors.atmo5,
      disabledBackgroundColor: theme.colors.atmo2,
      readOnlyBorder: `1px solid ${theme.colors.atmo5}`,
      readOnlyBackgroundColor: theme.colors.atmo2,
      openBorderColor: theme.colors.acce4,
    },
    baseRadio: {
      hoverColor: theme.colors.acce2s,
      hoverBorderRadius: "2px",
      disabledColor: theme.colors.atmo5,
      borderRadius: 0,
      padding: 0,
      focusBorderRadius: "8px",
    },
  },
}));

export default ds5Theme;
