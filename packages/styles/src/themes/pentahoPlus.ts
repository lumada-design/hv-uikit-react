import { makeColors, makeTheme } from "../makeTheme";
import {
  amber,
  blue,
  cyan,
  emerald,
  fuchsia,
  green,
  indigo,
  lime,
  neutral,
  orange,
  pink,
  red,
  rose,
  sky,
  slate,
  teal,
  violet,
  yellow,
} from "../palette";

const pentahoPlus = makeTheme((theme) => ({
  name: "pentahoPlus",
  colors: makeColors({
    brand: blue[600],
    catastrophic: [rose[800], pink[600]],
    // TODO: review _20 token differences
    negative_20: red[100],
    warning_20: amber[100],
    positive_20: green[100],
    neutral_20: sky[100],
    shadow: `0px 2px 4px -1px ${theme.alpha(slate[700], 0.08)}`,
    shad1: theme.alpha(slate[700], 0.08),

    primary: [blue[600], blue[500]],
    primaryStrong: [blue[700], blue[600]],
    primaryDeep: [blue[800], blue[700]],
    primarySubtle: [blue[200], blue[900]],
    primaryDimmed: [blue[100], blue[950]],
    positive: [emerald[600], green[600]],
    positiveStrong: [emerald[700], green[500]],
    positiveDeep: [emerald[800], green[300]],
    positiveDimmed: [emerald[50], green[950]],
    positiveSubtle: [emerald[100], green[900]],
    positiveBorder: [emerald[200], green[800]],
    warning: [amber[500], yellow[500]],
    warningStrong: [amber[600], yellow[400]],
    warningDeep: [amber[700], yellow[300]],
    warningDimmed: [amber[50], yellow[950]],
    warningSubtle: [amber[100], yellow[900]],
    warningBorder: [amber[200], yellow[800]],
    negative: red[600],
    negativeStrong: [red[700], red[500]],
    negativeDeep: [red[800], red[300]],
    negativeDimmed: [red[50], red[950]],
    negativeSubtle: [red[100], red[900]],
    negativeBorder: [red[200], red[800]],
    info: [sky[500], cyan[500]],
    infoStrong: [sky[600], cyan[400]],
    infoDeep: [sky[700], cyan[300]],
    infoDimmed: [sky[50], cyan[950]],
    infoSubtle: [sky[100], cyan[900]],
    infoBorder: [sky[200], cyan[800]],

    text: [slate[700], slate[50]],
    textSubtle: [slate[500], slate[400]],
    textDisabled: [neutral[400], neutral[500]],
    textDimmed: [slate[400], slate[600]],
    textLight: slate[50],
    textDark: slate[700],

    border: [slate[300], slate[700]],
    borderSubtle: [slate[200], slate[950]],
    borderStrong: [slate[500], slate[400]],
    borderDisabled: [neutral[400], neutral[700]],

    bgPage: [slate[100], slate[900]],
    bgContainer: [slate[50], slate[800]],
    bgPageSecondary: [slate[200], slate[950]],
    bgContainerSecondary: [slate[100], slate[900]],
    bgHover: theme.alpha(blue[600], 0.08),
    bgDisabled: [neutral[200], neutral[900]],
    bgOverlay: [theme.alpha(slate[950], 0.6), theme.alpha(slate[900], 0.4)],
    dimmer: ["#FFFFFF", "#000000"],

    cat1: blue[300],
    cat2: orange[300],
    cat3: teal[400],
    cat4: violet[400],
    cat5: pink[400],
    cat6: yellow[400],
    cat7: fuchsia[300],
    cat8: cyan[400],
    cat9: lime[300],
    cat10: rose[400],
    cat11: green[600],
    cat12: indigo[500],
  }),
  fontFamily: {
    body: "Inter, Arial, Helvetica, sans-serif",
  },
  typography: {
    display: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl4,
      lineHeight: theme.lineHeights.xl4,
      letterSpacing: "0.00504em",
    },
    title1: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl3,
      lineHeight: theme.lineHeights.xl3,
      letterSpacing: "0.00384em",
    },
    title2: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl2,
      lineHeight: theme.lineHeights.xl2,
      letterSpacing: "0.00288em",
    },
    title3: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl,
      lineHeight: theme.lineHeights.xl,
      letterSpacing: "0.0024em",
    },
    title4: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
      letterSpacing: "0.00192em",
    },
    label: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
      letterSpacing: "0.00168em",
    },
    body: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
      letterSpacing: "0.00168em",
    },
    captionLabel: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      letterSpacing: 0,
    },
    caption1: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      letterSpacing: "0.00144em",
    },
    caption2: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.xs,
      lineHeight: theme.lineHeights.xs,
      letterSpacing: "0.0012em",
    },
  },
  sizes: {
    xs: "32px",
    sm: "40px",
    md: "48px",
    lg: "56px",
    xl: "64px",
  },
  radii: {
    base: "4px",
    round: "8px",
    large: "16px",
  },
  icons: {
    viewBox: "0 0 256 256",
    // Semantic icons
    Success:
      "M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z",
    Caution:
      "M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z",
    Fail: "M128,72a8,8,0,0,1,8,8v56a8,8,0,0,1-16,0V80A8,8,0,0,1,128,72ZM116,172a12,12,0,1,0,12-12A12,12,0,0,0,116,172Zm124-44a15.85,15.85,0,0,1-4.67,11.28l-96.05,96.06a16,16,0,0,1-22.56,0h0l-96-96.06a16,16,0,0,1,0-22.56l96.05-96.06a16,16,0,0,1,22.56,0l96.05,96.06A15.85,15.85,0,0,1,240,128Zm-16,0L128,32,32,128,128,224h0Z",
    Info: "M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z",
  },
  header: {
    height: "64px",
    secondLevelHeight: "56px",
  },
  form: {
    errorColor: theme.colors.negative,
  },
  bulkActions: {
    actionButtonVariant: "primaryGhost",
  },
  table: {
    rowStripedBackgroundColorEven: theme.colors.bgContainer, // TODO - remove in v6
    rowStripedBackgroundColorOdd: "transparent", // TODO - remove in v6
    rowExpandBackgroundColor: theme.colors.bgPage, // TODO - remove in v6
    rowSortedColor: theme.colors.primary, // TODO - remove in v6
    rowSortedColorAlpha: "0.1", // TODO - remove in v6
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
  scrollTo: {
    dotSelectedSize: 6,
    backgroundColorOpacity: 0.9, // TODO - remove in v6
  },
  colorPicker: {
    hueDirection: "horizontal",
  },
  snackbar: {
    actionButtonVariant: "secondaryGhost",
  },
}));

export default pentahoPlus;
