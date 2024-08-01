import type { CSSObject } from "@emotion/serialize";

import { makeTheme } from "../makeTheme";
import { radii } from "../tokens";
import { colors } from "../tokens/colors";
import {
  amber,
  blue,
  cyan,
  emerald,
  green,
  neutral,
  orange,
  pink,
  red,
  rose,
  sky,
  slate,
  yellow,
} from "../tokens/colorsPalette";

/** light-dark alias */
const ld = (c1: string, c2: string) => `light-dark(${c1}, ${c2})`;

/** custom button using `light-dark` theming scheme */
const buttonColors = {
  primary: {
    subtleBg: ld(blue[50], blue[950]),
    subtleBorder: ld(blue[200], blue[800]),
  },
  secondary: {
    subtleBg: ld(slate[100], slate[800]),
    subtleBorder: ld(slate[300], slate[700]),
  },
  success: {
    subtleBorder: ld(green[200], green[800]),
    subtleBg: ld(emerald[100], green[900]),
  },
  warning: {
    subtleBorder: ld(amber[200], amber[800]),
    subtleBg: ld(amber[100], amber[900]),
  },
  error: {
    subtleBorder: ld(red[200], red[800]),
    subtleBg: ld(red[100], red[900]),
  },
};

const inputColors = {
  bg: ld("white", "black"),
  border: ld(slate[400], slate[600]),
  borderHover: ld(blue[600], blue[600]),
  borderActive: ld(slate[700], slate[300]),
};

const pentahoPlus = makeTheme((theme) => ({
  name: "pentahoPlus",
  colors: {
    modes: {
      dawn: {
        type: "light",
        ...colors.common,
        ...colors.light,
        brand: blue[600],
        containerBackgroundHover: `color-mix(in srgb, ${blue[600]} 10%, transparent)`,
        backgroundColor: slate[100],
        atmo1: slate[50],
        atmo2: slate[100],
        atmo3: slate[200],
        atmo4: slate[300],
        base_light: slate[50],
        base_dark: slate[700],
        primary: blue[600],
        primary_80: blue[500],
        primary_20: `color-mix(in srgb, ${blue[600]} 10%, transparent)`,
        secondary: slate[700],
        secondary_80: slate[500],
        secondary_60: slate[400],
        secondary_20: `color-mix(in srgb, ${slate[700]} 10%, transparent)`, // 🆕
        positive: green[600],
        positive_120: green[700],
        positive_80: green[400],
        neutral: sky[500],
        warning: amber[500],
        warning_120: orange[500],
        warning_140: orange[700],
        negative: red[600],
        negative_120: red[700],
        negative_80: red[400],
        catastrophic: rose[800],
        negative_20: red[100],
        warning_20: amber[100],
        positive_20: green[100],
        neutral_20: sky[100],
        shadow: `0px 2px 4px -1px color-mix(in srgb, ${slate[700]} 8%, transparent)`,
        shad1: `color-mix(in srgb, ${slate[700]} 8%, transparent)`,

        pp: {
          primary: blue[600],
          primaryAction: blue[700],
          primaryStrong: blue[800],
          primarySubtle: blue[200],
          primaryDimmed: blue[100],
          success: green[600],
          successAction: green[700],
          successStrong: green[800],
          successDimmed: green[50],
          warning: amber[500],
          warningAction: amber[600],
          warningStrong: amber[700],
          warningDimmed: amber[50],
          error: red[600],
          errorAction: red[700],
          errorStrong: red[800],
          errorDimmed: red[50],
          neutral: cyan[500],
          neutralAction: cyan[600],
          neutralStrong: cyan[700],
          neutralDimmed: cyan[50],

          text: slate[700],
          textSubtle: slate[500],
          textDisabled: neutral[400],
          textDimmed: slate[300],
          link: blue[600],
          linkActive: blue[700],

          divider: slate[300],
          dividerSubtle: slate[200],
          dividerDimmed: slate[400],
          bgPage: slate[100],
          bgSurface: slate[50],
          bgActive: slate[200],
          bgHover: blue[100],
          bgDisabled: neutral[200],
          bgOverlay: `color-mix(in srgb, ${slate[900]} 60%, transparent)`,
          dimmer: "#FFFFFF",

          borderDisabled: neutral[400],
        },
      },
      wicked: {
        type: "dark",
        ...colors.common,
        ...colors.dark,
        brand: blue[600],
        containerBackgroundHover: `color-mix(in srgb, ${blue[500]} 10%, transparent)`,
        backgroundColor: slate[900],
        atmo1: slate[800],
        atmo2: slate[900],
        atmo3: slate[950],
        atmo4: slate[700],
        base_light: slate[50],
        base_dark: slate[700],
        primary: blue[500],
        primary_80: blue[400],
        primary_20: `color-mix(in srgb, ${blue[500]} 10%, transparent)`,
        secondary: slate[50],
        secondary_80: slate[200],
        secondary_60: slate[300],
        secondary_20: `color-mix(in srgb, ${slate[50]} 10%, transparent)`, // 🆕
        positive: green[500],
        positive_120: green[600],
        positive_80: green[400],
        neutral: sky[500],
        warning: amber[500],
        warning_120: amber[600],
        warning_140: orange[600],
        negative: red[500],
        negative_120: red[600],
        negative_80: red[300],
        catastrophic: pink[600],
        negative_20: red[100],
        warning_20: amber[100],
        positive_20: green[100],
        neutral_20: sky[100],
        shadow: `0px 2px 4px -1px color-mix(in srgb, ${slate[700]} 8%, transparent)`,
        shad1: `color-mix(in srgb, ${slate[700]} 8%, transparent)`,

        pp: {
          primary: blue[400],
          primaryAction: blue[300],
          primaryStrong: blue[200],
          primarySubtle: blue[900],
          primaryDimmed: blue[950],
          success: green[600],
          successAction: green[500],
          successStrong: green[300],
          successDimmed: green[950],
          warning: yellow[500],
          warningAction: yellow[400],
          warningStrong: yellow[300],
          warningDimmed: yellow[950],
          error: red[600],
          errorAction: red[500],
          errorStrong: red[300],
          errorDimmed: red[950],
          neutral: cyan[500],
          neutralAction: cyan[400],
          neutralStrong: cyan[300],
          neutralDimmed: cyan[950],

          text: slate[50],
          textSubtle: slate[400],
          textDisabled: neutral[500],
          textDimmed: slate[700],
          link: blue[400],
          linkActive: blue[300],

          divider: slate[700],
          dividerSubtle: slate[700],
          dividerDimmed: slate[500],
          bgPage: slate[950],
          bgSurface: slate[900],
          bgActive: slate[900],
          bgHover: blue[950],
          bgDisabled: neutral[900],
          bgOverlay: `color-mix(in srgb, ${slate[900]} 40%, transparent)`,

          dimmer: "#000000",

          borderDisabled: neutral[700],
        },
      },
    },
  },
  fontFamily: {
    body: "Inter, Arial, Helvetica, sans-serif",
  },
  typography: {
    display: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl4,
      lineHeight: theme.lineHeights.xl4,
      letterSpacing: "0.00504em",
    },
    title1: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl3,
      lineHeight: theme.lineHeights.xl3,
      letterSpacing: "0.00384em",
    },
    title2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl2,
      lineHeight: theme.lineHeights.xl2,
      letterSpacing: "0.00288em",
    },
    title3: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl,
      lineHeight: theme.lineHeights.xl,
      letterSpacing: "0.0024em",
    },
    title4: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
      letterSpacing: "0.00192em",
    },
    label: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
      letterSpacing: "0.00168em",
    },
    body: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
      letterSpacing: "0.00168em",
    },
    captionLabel: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      letterSpacing: 0,
    },
    caption1: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      letterSpacing: "0.00144em",
    },
    caption2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.xs,
      lineHeight: theme.lineHeights.xs,
      letterSpacing: "0.0012em",
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
  sizes: {
    xs: "32px",
    md: "48px",
    lg: "56px",
    xl: "64px",
    sm: "40px",
  },
  radii: {
    ...radii,
    base: "6px",
  },
  icons: {
    viewbox: "0 0 256 256",
    Add: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z",
    // Box: "",
    Calendar:
      "M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z",
    Caution:
      "M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z",
    // Check: "",
    Chevron:
      "M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z",
    Close:
      "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z",
    ColorPicker:
      "M224,67.3a35.79,35.79,0,0,0-11.26-25.66c-14-13.28-36.72-12.78-50.62,1.13L142.8,62.2a24,24,0,0,0-33.14.77l-9,9a16,16,0,0,0,0,22.64l2,2.06-51,51a39.75,39.75,0,0,0-10.53,38l-8,18.41A13.68,13.68,0,0,0,36,219.3a15.92,15.92,0,0,0,17.71,3.35L71.23,215a39.89,39.89,0,0,0,37.06-10.75l51-51,2.06,2.06a16,16,0,0,0,22.62,0l9-9a24,24,0,0,0,.74-33.18l19.75-19.87A35.75,35.75,0,0,0,224,67.3ZM97,193a24,24,0,0,1-24,6,8,8,0,0,0-5.55.31l-18.1,7.91L57,189.41a8,8,0,0,0,.25-5.75A23.88,23.88,0,0,1,63,159l51-51,33.94,34ZM202.13,82l-25.37,25.52a8,8,0,0,0,0,11.3l4.89,4.89a8,8,0,0,1,0,11.32l-9,9L112,83.26l9-9a8,8,0,0,1,11.31,0l4.89,4.89a8,8,0,0,0,11.33,0l24.94-25.09c7.81-7.82,20.5-8.18,28.29-.81a20,20,0,0,1,.39,28.7Z",
    // CurrentStep: "",
    Delete:
      "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z",
    Doc: "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z",
    Edit: "M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z",
    End: "M149.66,122.34a8,8,0,0,1,0,11.32l-80,80a8,8,0,0,1-11.32-11.32L132.69,128,58.34,53.66A8,8,0,0,1,69.66,42.34ZM184,40a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V48A8,8,0,0,0,184,40Z",
    Fail: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z",
    Filters:
      "M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm106.18,74.58A8,8,0,0,0,144,136v58.66L112,216V136a8,8,0,0,0-2.16-5.47L40,56H216Z",
    Fullscreen:
      "M216,48V96a8,8,0,0,1-16,0V67.31l-42.34,42.35a8,8,0,0,1-11.32-11.32L188.69,56H160a8,8,0,0,1,0-16h48A8,8,0,0,1,216,48ZM98.34,146.34,56,188.69V160a8,8,0,0,0-16,0v48a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16H67.31l42.35-42.34a8,8,0,0,0-11.32-11.32ZM208,152a8,8,0,0,0-8,8v28.69l-42.34-42.35a8,8,0,0,0-11.32,11.32L188.69,200H160a8,8,0,0,0,0,16h48a8,8,0,0,0,8-8V160A8,8,0,0,0,208,152ZM67.31,56H96a8,8,0,0,0,0-16H48a8,8,0,0,0-8,8V96a8,8,0,0,0,16,0V67.31l42.34,42.35a8,8,0,0,0,11.32-11.32Z",
    Info: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z",
    Menu: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z",
    MoreOptionsHorizontal:
      "M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z",
    MoreOptionsVertical:
      "M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z",
    // OtherStep: "",
    // Partial: "",
    Preview:
      "M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z",
    PreviewOff:
      "M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z",
    Search:
      "M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z",
    // Selected: "",
    SortAscendingXS:
      "M128,128a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16h72A8,8,0,0,1,128,128ZM48,72H184a8,8,0,0,0,0-16H48a8,8,0,0,0,0,16Zm56,112H48a8,8,0,0,0,0,16h56a8,8,0,0,0,0-16Zm125.66-21.66a8,8,0,0,0-11.32,0L192,188.69V112a8,8,0,0,0-16,0v76.69l-26.34-26.35a8,8,0,0,0-11.32,11.32l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,229.66,162.34Z",
    SortDescendingXS:
      "M40,128a8,8,0,0,1,8-8h72a8,8,0,0,1,0,16H48A8,8,0,0,1,40,128Zm8-56h56a8,8,0,0,0,0-16H48a8,8,0,0,0,0,16ZM184,184H48a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16ZM229.66,82.34l-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,11.32,11.32L176,67.31V144a8,8,0,0,0,16,0V67.31l26.34,26.35a8,8,0,0,0,11.32-11.32Z",
    SortXS:
      "M200,136a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,136Zm32-56H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-80,96H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z",
    Start:
      "M197.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L123.31,128ZM72,40a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V48A8,8,0,0,0,72,40Z",
    Success:
      "M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z",
    Time: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z",
    // Unselected: "",
    User: "M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z",
  },
  components: {
    HvLoading: {
      classes: {
        loadingBar: {
          borderRadius: 1,
        },
      },
    },
    HvBadge: {
      classes: {
        badgePosition: {
          color: theme.colors.base_light,
          backgroundColor: "#334155",
        },
      },
    },
    HvBaseCheckBox: {
      classes: {
        root: {
          "& svg": {
            width: 16,
            height: 16,
            borderRadius: "3px",
            border: `1px solid ${theme.colors.pp.textSubtle}`,
          },
          "&:hover": {
            backgroundColor: theme.colors.pp.bgHover,
          },
        },
        checked: {
          "& svg": {
            border: `1px solid ${theme.colors.primary}`,
            backgroundColor: theme.colors.primary,
            color: theme.colors.atmo1,
          },
          "&.HvBaseCheckBox-disabled": {
            "& svg": {
              color: theme.colors.pp.textDisabled,
            },
          },
        },
        disabled: {
          "&.HvBaseCheckBox-root": {
            "& svg": {
              border: `1px solid ${theme.colors.pp.textDisabled}`,
              backgroundColor: theme.colors.pp.bgDisabled,
            },
          },
        },
        indeterminate: {
          "& svg": {
            backgroundColor: theme.colors.pp.bgSurface,
            border: `1px solid ${theme.colors.pp.textSubtle}`,
            color: theme.colors.pp.textSubtle,
          },
          "&.HvBaseCheckBox-disabled": {
            "& svg": {
              color: theme.colors.pp.textDisabled,
            },
          },
        },
      },
    },
    HvBaseRadio: {
      classes: {
        root: {
          "& svg": {
            backgroundColor: theme.colors.pp.bgSurface,
            borderColor: theme.colors.pp.textSubtle,
          },
          "&:hover": {
            backgroundColor: theme.colors.pp.bgHover,
          },
        },
        checked: {
          "& svg": {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.primary,
          },
          "&.HvBaseRadio-disabled": {
            "& svg": {
              borderColor: theme.colors.pp.textDisabled,
              backgroundColor: theme.colors.pp.textDisabled,
              color: theme.colors.pp.bgDisabled,
            },
          },
        },
        disabled: {
          "& svg": {
            border: `1px solid ${theme.colors.pp.textDisabled}`,
            backgroundColor: theme.colors.pp.bgDisabled,
          },
        },
      },
    },
    HvDotPagination: {
      classes: {
        radio: {
          width: 16,
          minWidth: 16,
        },
      },
    },
    HvBaseSwitch: {
      classes: {
        root: {
          "&:hover": {
            backgroundColor: theme.colors.pp.bgHover,
          },
          "& .HvBaseSwitch-switchBase": {
            "& .HvBaseSwitch-thumb": {
              backgroundColor: theme.colors.pp.bgSurface,
              borderColor: theme.colors.pp.bgSurface,
              boxShadow: `0px 1px 1px 0px color-mix(in srgb, ${slate[700]} 16%, transparent)`,
            },
            "+.HvBaseSwitch-track": {
              height: 14,
              backgroundColor: theme.colors.pp.textDimmed,
              borderColor: theme.colors.pp.textSubtle,
            },
            "&.HvBaseSwitch-checked": {
              "& .HvBaseSwitch-thumb": {
                border: `1px solid ${theme.colors.pp.bgSurface}`,
              },
              "+.HvBaseSwitch-track": {
                backgroundColor: theme.colors.pp.primary,
                borderColor: theme.colors.pp.primaryStrong,
              },
            },
            "&.HvBaseSwitch-disabled": {
              "& .HvBaseSwitch-thumb": {
                backgroundColor: theme.colors.pp.borderDisabled,
                borderColor: theme.colors.pp.borderDisabled,
              },
              "+.HvBaseSwitch-track": {
                borderColor: theme.colors.pp.borderDisabled,
                backgroundColor: theme.colors.pp.bgDisabled,
              },
            },
          },
        },
        thumb: {
          height: 10,
          width: 10,
        },
      },
    },
    HvSelect: {
      classes: {
        root: {
          "&& .HvButton-secondarySubtle": {
            borderColor: inputColors.border,
            backgroundColor: inputColors.bg,
          },
          "&& .HvDropdownButton-openUp": {
            borderRadius: `0 0 ${theme.radii.base} ${theme.radii.base}`,
          },
          "&& .HvDropdownButton-openDown": {
            borderRadius: `${theme.radii.base} ${theme.radii.base} 0 0`,
          },
        },
        select: {
          borderRadius: theme.radii.base,
        },
        panel: {
          borderColor: inputColors.border,
        },
      },
    },
    HvSuggestions: {
      classes: {
        list: {
          borderColor: inputColors.border,
        },
      },
    },
    HvTag: {
      classes: {
        root: {
          borderRadius: theme.radii.full,
          padding: theme.spacing("2px", 0),
        },
        label: {
          paddingLeft: 8,
          paddingRight: 8,
        },
        icon: {
          marginLeft: theme.space.xs,
        },
        deleteIcon: {
          borderRadius: "inherit",
          paddingRight: 4,
        },
        selected: {},
      },
    },
    HvInlineEditor: {
      classes: {
        button: {
          borderRadius: 2,
          "&:focus": {
            borderColor: theme.colors.secondary,
          },
        },
        inputRoot: {
          borderRadius: 2,
        },
      },
    },
    HvButton: {
      classes: {
        root: {
          "--radius": theme.radii.full,
          ":where(:not(.HvButton-disabled,.HvButton-contained))": {
            "&[data-color=positive]": { color: theme.colors.pp.success },
            "&[data-color=warning]": { color: theme.colors.pp.warning },
            "&[data-color=negative]": { color: theme.colors.pp.error },
            ":hover": { backgroundColor: theme.colors.pp.primaryDimmed },
            ":active": { backgroundColor: theme.colors.pp.primarySubtle },
          },
        },
        contained: {
          ":where(:not(.HvButton-disabled))": {
            color: "#FFFFFF",
            "&[data-color=primary]": {
              backgroundColor: blue[600],
              ":hover": { backgroundColor: blue[700] },
              ":active": { backgroundColor: blue[800] },
            },
            "&[data-color=positive]": {
              ":hover": { backgroundColor: theme.colors.pp.successAction },
              ":active": { backgroundColor: theme.colors.pp.successStrong },
            },
            "&[data-color=warning]": {
              ":hover": { backgroundColor: theme.colors.pp.warningAction },
              ":active": { backgroundColor: theme.colors.pp.warningStrong },
            },
            "&[data-color=negative]": {
              ":hover": { backgroundColor: theme.colors.pp.errorAction },
              ":active": { backgroundColor: theme.colors.pp.errorStrong },
            },
          },
        },
        subtle: {
          borderColor: "color-mix(in srgb, currentcolor, transparent 60%)",
          ":where(:not(.HvButton-disabled))": {
            "&[data-color=primary]": {
              borderColor: buttonColors.primary.subtleBorder,
              backgroundColor: buttonColors.primary.subtleBg,
            },
            "&[data-color=secondary]": {
              borderColor: buttonColors.secondary.subtleBorder,
              backgroundColor: buttonColors.secondary.subtleBg,
            },
            ":hover": {
              backgroundColor: theme.colors.pp.primaryDimmed,
            },
            ":active": {
              borderColor: "transparent",
              backgroundColor: theme.colors.pp.primarySubtle,
            },
            "&[data-color=positive]": {
              borderColor: buttonColors.success.subtleBorder,
              backgroundColor: theme.colors.pp.successDimmed,
              ":hover": { backgroundColor: buttonColors.success.subtleBg },
              ":active": { backgroundColor: buttonColors.success.subtleBorder },
            },
            "&[data-color=warning]": {
              borderColor: buttonColors.warning.subtleBorder,
              backgroundColor: theme.colors.pp.warningDimmed,
              ":hover": { backgroundColor: buttonColors.warning.subtleBg },
              ":active": { backgroundColor: buttonColors.warning.subtleBorder },
            },
            "&[data-color=negative]": {
              borderColor: buttonColors.error.subtleBorder,
              backgroundColor: theme.colors.pp.errorDimmed,
              ":hover": { backgroundColor: buttonColors.error.subtleBg },
              ":active": { backgroundColor: buttonColors.error.subtleBorder },
            },
          },
        },
        ghost: {
          ":where(:not(.HvButton-disabled))": {
            "&[data-color=positive]": {
              ":hover": { backgroundColor: theme.colors.pp.successDimmed },
              ":active": { backgroundColor: buttonColors.success.subtleBg },
            },
            "&[data-color=warning]": {
              ":hover": { backgroundColor: theme.colors.pp.warningDimmed },
              ":active": { backgroundColor: buttonColors.warning.subtleBg },
            },
            "&[data-color=negative]": {
              ":hover": { backgroundColor: theme.colors.pp.errorDimmed },
              ":active": { backgroundColor: buttonColors.error.subtleBg },
            },
          },
        },

        semantic: {},

        disabled: {
          color: theme.colors.pp.textDisabled,
          ":not(.HvButton-ghost)": {
            borderColor: "transparent",
            backgroundColor: theme.colors.pp.bgDisabled,
            "&:hover, &:active": {
              backgroundColor: theme.colors.pp.bgDisabled,
            },
          },
        },
      },
    },
    HvMultiButton: {
      classes: {
        multiple: {
          borderRadius: theme.radii.full,
          borderColor: buttonColors.secondary.subtleBorder,
          "& .HvMultiButton-button": {
            borderColor: "inherit",
            ...theme.typography.body,
            "&.HvMultiButton-firstButton": {
              borderRadius: `${theme.radii.full} 0 0 ${theme.radii.full}`,
            },
            "&.HvMultiButton-lastButton": {
              borderRadius: `0 ${theme.radii.full} ${theme.radii.full} 0`,
            },
            "&.HvMultiButton-selected": {
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
              backgroundColor: theme.colors.pp.primaryDimmed,
            },
            "&:not(.HvMultiButton-firstButton, .HvMultiButton-lastButton)": {
              borderRadius: 0,
            },
          },
        },
        vertical: {
          borderColor: buttonColors.secondary.subtleBorder,
          "& .HvMultiButton-button": {
            borderColor: "inherit",
            "&.HvMultiButton-firstButton": {
              borderRadius: "16px 16px 0 0",
            },
            "&.HvMultiButton-lastButton": {
              borderRadius: "0 0 16px 16px",
            },
            "&.HvMultiButton-selected": {
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
              backgroundColor: theme.colors.pp.primaryDimmed,
            },
          },
        },
        splitGroup: {},
        splitGroupDisabled: {},
      },
    },
    HvDropdownButton: {
      classes: {
        openUp: {
          borderRadius:
            "0px 0px calc(var(--HvButton-height) / 2) calc(var(--HvButton-height) / 2)",
        },
        openDown: {
          borderRadius:
            "calc(var(--HvButton-height) / 2) calc(var(--HvButton-height) / 2) 0px 0px",
        },
        disabled: {
          backgroundColor: theme.colors.pp.bgDisabled,
          borderColor: theme.colors.pp.bgDisabled,
          "&.HvButton-subtle": {
            backgroundColor: theme.colors.pp.bgDisabled,
            borderColor: theme.colors.pp.bgDisabled,
            "&:hover": {
              backgroundColor: theme.colors.pp.bgDisabled,
            },
          },
          "&.HvButton-ghost": {
            backgroundColor: theme.colors.pp.bgDisabled,
            borderColor: theme.colors.pp.bgDisabled,
            "&:hover": {
              backgroundColor: theme.colors.pp.bgDisabled,
            },
          },
        },
      },
    },
    HvHeader: {
      classes: {
        root: {
          borderBottom: `1px solid ${theme.colors.atmo3}`,
          boxShadow: "none",
        },
      },
    },
    HvHeaderBrand: {
      classes: {
        separator: {
          backgroundColor: theme.colors.atmo4,
          margin: theme.spacing(0, "md"),
          height: 32,
        },
      },
    },
    HvHeaderMenuBarBar: {
      classes: {
        active: {
          boxShadow: "none",
          borderBottom: `1px solid ${theme.colors.atmo3}`,
        },
        list: {
          "& li:hover > .HvHeader-MenuBar-hidden": {
            boxShadow: "none",
            borderBottom: `1px solid ${theme.colors.atmo3}`,
          },
          "& li:focus-within > .HvHeader-MenuBar-hidden": {
            boxShadow: "none",
            borderBottom: `1px solid ${theme.colors.atmo3}`,
          },
        },
      },
    },
    HvVerticalNavigation: {
      classes: {
        root: {
          color: theme.colors.base_light,
          backgroundColor: slate[900],
          borderRight: `1px solid ${slate[500]}`,
          "& > :not(nav:first-of-type)": {
            borderTop: `1px solid ${slate[500]}`,
          },
          "& > :only-child": {
            padding: theme.space.sm,
            "& .HvVerticalNavigationSlider-listContainer": { padding: 0 },
          },
        },
        slider: {
          "& > div:first-of-type": {
            borderBottom: `1px solid ${slate[500]}`,
          },
        },
      },
    },
    HvVerticalNavigationAction: {
      classes: {
        action: {
          borderRadius: "8px",
          "&:hover, &:focus": {
            backgroundColor: slate[700],
          },
        },
      },
    },
    HvVerticalNavigationSlider: {
      classes: {
        root: {
          minHeight: "32px",
          borderLeft: "unset",
          borderRadius: "8px",
          "&.HvIsFocused": {
            backgroundColor: slate[700],
          },
          "&.HvListItem-interactive:not(.HvListItem-disabled):not(.HvListItem-selected):hover":
            {
              backgroundColor: slate[700],
            },
        },
        listItemDisabled: {
          color: neutral[500],
          backgroundColor: neutral[800],
          "& .HvListItem-startAdornment": { backgroundColor: "transparent" },
          "& .HvListItem-endAdornment": { backgroundColor: "transparent" },
        },
        listItemSelected: {
          background: blue[950],
          borderLeft: "unset",
        },
        listItemFocus: {
          background: slate[700],
        },
        listContainer: {
          padding: theme.space.sm,
        },
      },
    },
    HvVerticalNavigationTreeViewItem: {
      classes: {
        content: {
          borderLeft: "unset",
          borderRadius: "8px",
          ".HvVerticalNavigationTreeViewItem-selected>&": {
            background: blue[950],
            borderLeft: "unset",
          },
          ":not(.HvVerticalNavigationTreeViewItem-disabled>&):not(.HvVerticalNavigationTreeViewItem-selected>&)":
            {
              "&:hover, &:focus-visible, &.focus-visible": {
                background: slate[700],
              },
            },
          ".HvVerticalNavigationTreeViewItem-focused>&": {
            background: slate[700],
          },
        },
        disabled: {
          "& .HvVerticalNavigationTreeViewItem-label": {
            color: neutral[500],
          },
          "& .HvVerticalNavigationTreeViewItem-content": {
            background: neutral[800],
          },
        },
        icon: {
          "& .HvAvatar-root": {
            borderRadius: "8px",
          },
        },
      },
    },
    HvCard: {
      classes: {
        root: {
          outline: `1px solid ${theme.colors.pp.dividerSubtle}`,
          overflow: "hidden",
          height: "fit-content",
          borderRadius: theme.space.sm,
          "& > :last-child:not(.HvCardMedia-root)": {
            paddingBottom: theme.space.sm,
          },
          "& .HvActionBar-root": {
            padding: theme.spacing("xs", "sm"),
            borderTop: "none",
          },
        },
        selectable: {
          ":hover": {
            outline: `1px solid ${theme.colors.primary_20}`,
            backgroundColor: theme.colors.pp.primaryDimmed,
          },
        },
        semanticContainer: {
          display: "none",
        },
        selected: {
          outline: `1px solid ${theme.colors.pp.primaryAction}`,
        },
      },
    },
    HvCardHeader: {
      classes: {
        root: {
          flexDirection: "row-reverse",
          padding: `${theme.space.xs} ${theme.space.sm}`,
        },
        action: {
          paddingLeft: 0,
        },
      },
    },
    HvCardContent: {
      classes: {
        content: {
          padding: `${theme.space.xs} ${theme.space.sm}`,
          "&:last-child": {
            paddingBottom: theme.space.xs,
          },
        },
      },
    },
    HvFooter: {
      name: "Pentaho+",
    },
    HvTabs: {
      classes: {
        floating: {
          "& .HvTab-root": {
            marginTop: 0,
            zIndex: 1,
            "&:is(.HvTab-selected)": {
              borderColor: "transparent",
              backgroundColor: "transparent",
            },
            "&:hover": {
              borderRadius: theme.radii.full,
            },
            "::after": {
              display: "none",
            },
          },
          "& .HvTabs-indicator": {
            height: "100%",
            backgroundColor: theme.colors.pp.bgSurface,
            border: `1px solid ${theme.colors.primary}`,
            borderRadius: theme.radii.full,
          },
          "& .HvTabs-flexContainer": {
            display: "inline-flex",
            backgroundColor: theme.colors.pp.bgActive,
            borderRadius: theme.radii.full,
            marginLeft: 0,
          },
        },
      },
    },
    HvBaseInput: {
      classes: {
        root: {
          borderColor: inputColors.border,
          backgroundColor: inputColors.bg,
        },
      },
    },
    HvBaseDropdown: {
      classes: {
        header: {
          borderColor: inputColors.border,
          backgroundColor: inputColors.bg,
        },
        headerOpen: {
          borderColor: inputColors.border,
          "&:hover": {
            borderColor: inputColors.border,
          },
        },
        panel: {
          borderColor: inputColors.border,
        },
      },
    },
    HvDropDownMenu: {
      classes: {
        iconSelected: {
          "&[data-color=secondary]": {
            borderColor: inputColors.border,
          },
        },
      },
    },
  } satisfies Record<
    string,
    Record<string, any> & { classes?: Record<string, CSSObject> }
  >,
  header: {
    height: "64px",
    secondLevelHeight: "56px",
  },
  bulkActions: {
    actionButtonVariant: "primaryGhost",
  },
  table: {
    rowStripedBackgroundColorEven: theme.colors.atmo1, // TODO - remove in v6
    rowStripedBackgroundColorOdd: "transparent", // TODO - remove in v6
    rowExpandBackgroundColor: theme.colors.atmo2,
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
    actionButtonVariant: "secondarySubtle",
  },
}));

export default pentahoPlus;
