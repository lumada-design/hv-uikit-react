import { colors } from "../tokens/colors";
import { makeTheme } from "../makeTheme";

const ds5 = makeTheme((theme) => ({
  name: "ds5",
  colors: {
    modes: {
      dawn: {
        type: "light",
        backgroundColor: colors.light.atmo2,
        containerBackgroundHover: theme.colors.primary_20,
        ...colors.common,
        ...colors.light,
      },
      wicked: {
        type: "dark",
        backgroundColor: colors.dark.atmo2,
        containerBackgroundHover: theme.colors.primary_20,
        ...colors.common,
        ...colors.dark,
      },
    },
  },
  typography: {
    display: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl4,
      lineHeight: theme.lineHeights.xl4,
    },
    title1: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl3,
      lineHeight: theme.lineHeights.xl3,
    },
    title2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl2,
      lineHeight: theme.lineHeights.xl2,
    },
    title3: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl,
      lineHeight: theme.lineHeights.xl,
    },
    title4: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
    },
    label: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
    },
    body: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
    },
    caption1: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
    },
    caption2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.xs,
      lineHeight: theme.lineHeights.xs,
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
  border: {
    // `1px solid ${theme.colors.atmo4}`,
    width: "1px",
    color: theme.colors.secondary_80,
    style: "solid",
  },
  components: {},
  dropdown: {
    placeholderColor: theme.colors.secondary_80,
  },
  header: {
    height: "64px",
    backgroundColor: theme.colors.atmo1,
    secondLevelBackgroundColor: theme.colors.atmo2,
    borderTopThickness: "0px",
    selectedItemBorderTopColor: "transparent",
    selectedItemBorderTopThickness: "0px",
    selectedItemBorderBottomColor: theme.colors.secondary,
    selectedItemBorderBottomThickness: "4px",
    secondLevelSelectedItemBorderTopColor: "transparent",
    secondLevelSelectedItemBorderTopThickness: "0px",
    secondLevelSelectedItemBorderBottomColor: theme.colors.secondary,
    secondLevelSelectedItemBorderBottomThickness: "4px",
    shadow: theme.colors.shadow,
  },
  card: {
    titleVariant: "label",
    subheaderVariant: "caption1",
    subheaderColor: theme.colors.secondary,
  },
  dialog: {
    titleVariant: "title4",
  },
  baseSwitch: {
    padding: 0,
    height: "32px",
    width: "40px",
  },
  bulkActions: {
    actionButtonVariant: "primaryGhost",
  },
  table: {
    headerBorderTopColor: "transparent",
    rowBorderColor: theme.colors.atmo4,
    rowBorderRadius: theme.radii.base,
    rowListBorderRadius: theme.radii.round,
    rowListBorderColor: theme.colors.atmo4,
    rowStripedBackgroundColorEven: theme.colors.atmo1,
    rowStripedBackgroundColorOdd: "transparent",
    rowExpandBackgroundColor: theme.colors.atmo2,
    rowHoverBorderColor: theme.colors.atmo4,
    rowSortedColor: theme.colors.primary,
    rowSortedColorAlpha: "0.1",
    cellListBorder: "none",
    cellBorder: `solid 1px ${theme.colors.atmo4}`,
  },
  globalActions: {
    sectionVariant: "title4",
  },
  emptyState: {
    titleVariant: "title4",
  },
  tooltip: {
    borderRadius: theme.radii.round,
  },
  verticalNavigation: {
    activeBorderLeft: `4px solid ${theme.colors.secondary}`,
    inactiveBorderLeft: `4px solid transparent`,
  },
  slider: {
    dragBarColor: theme.colors.primary_20,
    ringColor: theme.colors.primary_20,
    ringOpacity: "100%",
  },
  stepNavigation: {
    separatorMargin: "4px",
    defaultSeparatorHeight: 1,
    simpleSeparatorHeight: 1,
  },
  filterGroup: {
    applyButtonVariant: "primary",
    cancelButtonVariant: "secondarySubtle",
  },
  datePicker: {
    placeholderVariant: "label",
  },
  scrollTo: {
    dotRootSize: "16px",
    dotRootRadius: "50%",
    dotHoverBackgroundColor: theme.colors.primary_20,
    dotHoverColor: theme.colors.secondary,
    dotHoverSize: "6px",
    dotNotSelectedColor: theme.colors.secondary_60,
    dotNotSelectedSize: "4px",
    dotSelectedSize: 6,
    backgroundColorOpacity: 0.9,
    backgroundColorBlur: "4px",
  },
  queryBuilder: {
    border: `1px solid ${theme.colors.atmo4}`,
  },
  colorPicker: {
    inputValueVariant: "label",
    recommendedColorsBottomPadding: "24px",
  },
  drawer: {
    backDropBackgroundColor: theme.colors.atmo4,
  },
  forms: {
    infoMessage: {
      textColor: theme.colors.secondary_80,
    },
    label: {
      fontWeight: theme.fontWeights.normal,
    },
  },
  snackbar: {
    actionButtonVariant: "secondarySubtle",
  },
}));

export default ds5;
