import { createClasses } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvLunara", {
  // Root Container styling
  root: {
    position: "fixed",
    display: "flex",
    width: "fit-content",
    maxWidth: 600,
    fontFamily: theme.fontFamily.body,
    gap: theme.spacing("xs"),
    "&$right": {
      flexDirection: "row-reverse",
    },
    zIndex: theme.zIndices.toast,
  },

  // Positioning of element
  "top-left": {
    top: "10%",
    left: "0",
  },
  "bottom-left": {
    bottom: "15%",
    left: "0",
    transform: "translate(0,100%)",
  },
  "top-right": {
    top: "10%",
    right: "0",
  },
  "bottom-right": {
    bottom: "15%",
    right: "0",
    transform: "translate(0,100%)",
  },
  "center-left": {
    top: "50%",
    left: "0",
  },
  "center-right": {
    top: "50%",
    right: "0",
  },

  // UL component styles
  uList: {
    display: "flex",
    opacity: 0,
    visibility: "hidden",
    margin: 0,
    padding: theme.spacing("xs"),
    gap: theme.spacing("xs"),
    flexWrap: "wrap",
    "&$expanded": {
      visibility: "visible",
      opacity: 1,
      transition: "opacity 1s ease-in-out",
    },
    "&$right": {
      flexDirection: "row-reverse",
    },
  },
  // list items styling
  listItem: {
    display: "inline-flex",
    flexGrow: 1,
    height: "fit-content",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing("xs"),
    cursor: "pointer",
  },

  expanded: {},
  right: {},
  outline: {},
  active: {},
  labelParent: {
    height: "fit-content",
    padding: theme.spacing("xs"),
    cursor: "pointer",
  },
  activeUlist: {},
  bgcolor: {},
  disabled: {},

  // Theme variants of component i.e primary, secondary, light and dark
  primary: {
    "&$bgcolor": {
      backgroundColor: theme.colors.cat3_40,
    },
    color: theme.colors.base_dark,
    "&:hover": {
      background: theme.colors.cat3_20,
    },
    "&$labelParent": {
      background: theme.colors.cat3_40,
      boxShadow: `0px 1px 6px ${theme.colors.secondary_60}`,
    },
    "&$activeUlist": {
      background: theme.colors.base_light,
      boxShadow: `0px 1px 6px ${theme.colors.secondary_60}`,
    },
    "&$outline": {
      border: `0.5px solid ${theme.colors.cat3_160}`,
    },
    "&$active": {
      background: theme.colors.base_light,
      color: theme.colors.brand,
    },
    "&$disabled": {
      opacity: 0.7,
      color: theme.colors.secondary,
      background: theme.colors.atmo3,
      pointerEvents: "none",
      cursor: "not-allowed",
    },
  },

  secondary: {
    "&$bgcolor": {
      backgroundColor: theme.colors.cat1_40,
    },
    color: theme.colors.base_dark,
    "&:hover": {
      background: theme.colors.cat1_20,
    },
    "&$outline": {
      border: `0.5px solid ${theme.colors.cat4_140}`,
    },
    "&$labelParent": {
      background: theme.colors.cat1_40,
      boxShadow: `0 1px 6px ${theme.colors.secondary_60}`,
      border: `0.5px solid ${theme.colors.atmo3}`,
      cursor: "pointer",
    },
    "&$activeUlist": {
      background: theme.colors.base_light,
      boxShadow: `0 1px 6px ${theme.colors.secondary_60}`,
      border: `0.5px solid ${theme.colors.atmo3}`,
    },
    "&$active": {
      background: theme.colors.base_light,
      color: theme.colors.brand,
    },
    "&$disabled": {
      opacity: 0.7,
      color: theme.colors.secondary,
      background: theme.colors.atmo3,
      pointerEvents: "none",
      cursor: "not-allowed",
    },
  },

  light: {
    "&$bgcolor": {
      backgroundColor: theme.colors.atmo4,
    },
    "&:hover": {
      background: theme.colors.atmo3,
    },
    "&$outline": {
      border: `0.5px solid ${theme.colors.base_dark}`,
    },
    "&$labelParent": {
      background: theme.colors.atmo1,
      boxShadow: `0 1px 6px ${theme.colors.secondary_60}`,
    },
    "&$activeUlist": {
      background: theme.colors.atmo1,
      boxShadow: `0 1px 6px ${theme.colors.secondary_60}`,
    },
    "&$active": {
      color: theme.colors.base_light,
      background: theme.colors.negative_120,
    },
    "&$disabled": {
      opacity: 0.7,
      color: theme.colors.secondary,
      background: theme.colors.atmo3,
      pointerEvents: "none",
      cursor: "not-allowed",
    },
  },

  // radius classes
  box: {},

  base: {
    borderRadius: theme.radii.base,
    "&$box": {
      borderRadius: theme.radii.base,
    },
  },
  round: {
    borderRadius: theme.radii.round,
    "&$box": {
      borderRadius: theme.radii.round,
    },
  },
  full: {
    borderRadius: theme.radii.full,
    "&$box": {
      borderRadius: 30,
    },
  },
  none: {},

  // font size and spacing
  sm: {
    fontSize: theme.fontSizes.sm,
  },
  lg: {
    fontSize: theme.fontSizes.lg,
    padding: theme.spacing("sm"),
  },
  xs: {
    fontSize: theme.fontSizes.xs,
    padding: theme.spacing("xs"),
  },

  // label variants classes
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
  italic: {
    fontStyle: "italic",
  },
  underlined: {
    textDecoration: "underline",
  },
  "bold-italic": {
    fontWeight: theme.fontWeights.bold,
    fontStyle: "italic",
  },
  "bold-underlined": {
    fontWeight: theme.fontWeights.bold,
    textDecoration: "underline",
  },
  "italic-underlined": {
    fontStyle: "italic",
    textDecoration: "underline",
  },
  "bold-italic-underlined": {
    fontWeight: theme.fontWeights.bold,
    fontStyle: "italic",
    textDecoration: "underline",
  },
  normal: {},
});
