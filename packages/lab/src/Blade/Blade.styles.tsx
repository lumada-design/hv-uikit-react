import { createClasses, outlineStyles } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvBlade", {
  root: {
    position: "relative",

    display: "flex",
    minWidth: 72,

    "& + $root": {
      marginLeft: theme.spacing("sm"),
    },

    transition: "flex-grow 800ms linear",

    zIndex: 0,

    color: theme.colors.secondary,
    backgroundColor: theme.colors.atmo1,
    borderRadius: theme.radii.round,
    border: `1px solid ${theme.colors.atmo4}`,
  },
  expanded: {},

  fullWidth: {
    flexGrow: 0,

    "&$expanded": {
      flexGrow: 1,
    },
  },

  heading: {},

  button: {
    height: "100%",
    minWidth: 70,

    "&[disabled], &:active": {
      outline: "none",
    },

    "&:focus": {
      outline: "none",
      background: theme.colors.containerBackgroundHover,
    },

    "&:hover": {
      background: theme.colors.containerBackgroundHover,
    },

    "&:focus-visible": {
      ...outlineStyles,
      zIndex: 1,
    },

    cursor: "pointer",
  },
  buttonDefaultPadding: {
    padding: theme.spacing("xs", "sm"),
  },

  container: {
    display: "inline-block",
    height: "100%",
    width: "100%",

    minWidth: 0,

    overflowX: "hidden",

    maxWidth: 0,
    transition: "max-width 800ms linear",
  },

  disabled: {
    cursor: "not-allowed",
    color: theme.colors.secondary_60,

    "&:focus": {
      background: "none",
    },

    "&:hover": {
      background: "none",
    },
  },
});
