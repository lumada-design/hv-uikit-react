import { makeColors, makeTheme } from "../makeTheme";
import { colors } from "../tokens/colors";

const ds3 = makeTheme((theme) => ({
  name: "ds3",
  colors: makeColors({
    bgPage: ["#F0F0F0", colors.dark.atmo2],
    bgHover: [colors.light.atmo3, colors.dark.atmo3],
    primaryStrong: ["#477DBD", ""],
    positive: ["", "#63A621"],
    info: ["#4D9284", "#72CCCB"],
    catastrophic: ["#C51162", "#E26BD2"],
    cat1: "#6EAFFF",
    cat2: "#FFAB5C",
    cat3: "#5CD1B2",
    cat4: "#9672C1",
    cat5: "#ED6868",
    cat6: "#58C9DD",
    cat7: "#FFDB70",
    cat8: "#4AB573",
    cat9: "#646A98",
    cat10: "#EB7397",
    cat11: "#33ABCC",
    cat12: "#F8C169",
    viz1: "#6EAFFF",
    viz2: "#FFAB5C",
    viz3: "#5CD1B2",
    viz4: "#9672C1",
    viz5: "#ED6868",
    viz6: "#58C9DD",
    viz7: "#FFDB70",
    viz8: "#4AB573",
    viz9: "#646A98",
    viz10: "#EB7397",
    viz11: "#33ABCC",
    viz12: "#F8C169",
  }),
  space: {
    base: 10,
    xxs: "4px",
    xs: "10px",
    sm: "20px",
    md: "30px",
    lg: "60px",
    xl: "90px",
  },
  breakpoints: {
    unit: "px",
    step: 5,
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1270,
      xl: 1920,
    },
  },
  typography: {
    display: {
      color: theme.colors.secondary,
      fontSize: "42px",
      letterSpacing: "0.02em",
      lineHeight: "52px",
      fontWeight: 600,
    },
    title1: {
      color: theme.colors.secondary,
      fontSize: "32px",
      letterSpacing: "0.02em",
      lineHeight: "40px",
      fontWeight: 600,
    },
    title2: {
      color: theme.colors.secondary,
      fontSize: "22px",
      letterSpacing: "0.02em",
      lineHeight: "30px",
      fontWeight: 600,
    },
    title3: {
      color: theme.colors.secondary,
      fontSize: "18px",
      letterSpacing: "0.02em",
      lineHeight: "28px",
      fontWeight: 600,
    },
    title4: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
    },
    label: {
      color: theme.colors.secondary,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    body: {
      color: theme.colors.secondary,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 400,
    },
    captionLabel: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
    },
    caption1: {
      color: theme.colors.secondary,
      fontSize: "10px",
      letterSpacing: "0.02em",
      lineHeight: "15px",
      fontWeight: 400,
    },
    caption2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.xs,
      lineHeight: theme.lineHeights.sm,
    },
    // LEGACY
    "5xlTitle": {
      color: theme.colors.secondary,
      fontSize: "52px",
      letterSpacing: "0.02em",
      lineHeight: "60px",
      fontWeight: 600,
    },
    "4xlTitle": {
      color: theme.colors.secondary,
      fontSize: "52px",
      letterSpacing: "0.02em",
      lineHeight: "60px",
      fontWeight: 400,
    },
    xxlTitle: {
      color: theme.colors.secondary,
      fontSize: "42px",
      letterSpacing: "0.02em",
      lineHeight: "52px",
      fontWeight: 400,
    },
    lTitle: {
      color: theme.colors.secondary,
      fontSize: "32px",
      letterSpacing: "0.02em",
      lineHeight: "40px",
      fontWeight: 400,
    },
    sTitle: {
      color: theme.colors.secondary,
      fontSize: "22px",
      letterSpacing: "0.02em",
      lineHeight: "30px",
      fontWeight: 400,
    },
    xxsTitle: {
      color: theme.colors.secondary,
      fontSize: "18px",
      letterSpacing: "0.02em",
      lineHeight: "28px",
      fontWeight: 400,
    },
    sectionTitle: {
      color: theme.colors.secondary,
      fontSize: "14px",
      letterSpacing: "0.32em",
      lineHeight: "18px",
      fontWeight: 400,
      textTransform: "uppercase",
    },
    placeholderText: {
      color: theme.colors.secondary_60,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 400,
    },
    link: {
      color: theme.colors.primary,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    disabledText: {
      color: theme.colors.secondary_60,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    selectedNavText: {
      color: theme.colors.brand,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    vizTextDisabled: {
      color: theme.colors.secondary_60,
      fontSize: "10px",
      letterSpacing: "0.02em",
      lineHeight: "15px",
      fontWeight: 400,
    },
    xsInlineLink: {
      color: theme.colors.primary,
      fontSize: "10px",
      letterSpacing: "0.02em",
      lineHeight: "15px",
      fontWeight: 600,
      textDecoration: "underline",
    },
  },
  header: {
    height: "44px",
    secondLevelHeight: "40px",
  },
  form: {
    errorColor: theme.colors.negative_120,
  },
  bulkActions: {
    actionButtonVariant: "semantic",
  },
  table: {
    rowStripedBackgroundColorEven: theme.colors.atmo1, // TODO - remove in v6
    rowStripedBackgroundColorOdd: "transparent", // TODO - remove in v6
    rowExpandBackgroundColor: theme.colors.atmo2, // TODO - remove in v6
    rowSortedColor: theme.colors.atmo1, // TODO - remove in v6
    rowSortedColorAlpha: "0.4", // TODO - remove in v6
  },
  stepNavigation: {
    separatorMargin: "0px",
    defaultSeparatorHeight: 3,
    simpleSeparatorHeight: 2,
  },
  filterGroup: {
    applyButtonVariant: "secondaryGhost",
    cancelButtonVariant: "secondaryGhost",
  },
  scrollTo: {
    dotSelectedSize: 10, // TODO - remove in v6
    backgroundColorOpacity: 0.8, // TODO - remove in v6
  },
  colorPicker: {
    hueDirection: "vertical",
  },
  snackbar: {
    actionButtonVariant: "semantic",
  },
}));

export default ds3;
