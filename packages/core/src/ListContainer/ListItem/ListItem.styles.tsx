import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvListItem", {
  root: {
    ...theme.typography.body,
    padding: 0,
    display: "block",
    height: "32px",
    lineHeight: "32px",
    listStyleType: "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    position: "relative",

    "&:not(:last-child)": {
      marginBottom: "8px",
    },

    "&$condensed": {
      marginBottom: 0,
    },

    "&.HvIsFocused": {
      ...outlineStyles,
      backgroundColor: theme.colors.atmo3,
      zIndex: 2,
    },
  },
  focus: { backgroundColor: theme.colors.atmo3, zIndex: 2 },
  startAdornment: {},
  endAdornment: {},
  gutters: {
    padding: `0 ${theme.space.xs}`,

    "&$withStartAdornment": {
      paddingLeft: 0,
    },
    "&$withEndAdornment": {
      paddingRight: 0,
    },
  },
  condensed: {},
  interactive: {
    cursor: "pointer",
    "&:not($disabled):not($selected):hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
    "&$disabled": {
      cursor: "not-allowed",
    },
  },
  selected: { backgroundColor: theme.colors.containerBackgroundHover },
  disabled: {
    color: theme.colors.secondary_60,
    backgroundColor: theme.colors.atmo3,
  },
  withStartAdornment: {
    "& > div": {
      float: "left",
    },

    "& svg": {
      boxShadow: "none !important",
      outline: "none !important",
    },
    "$disabled > svg *.color0": {
      fill: theme.colors.secondary_60,
    },
  },
  withEndAdornment: {
    "& > div": { float: "right" },

    "& svg": {
      boxShadow: "none !important",
      outline: "none !important",
    },
    "$disabled > svg *.color0": {
      fill: theme.colors.secondary_60,
    },
  },
});
