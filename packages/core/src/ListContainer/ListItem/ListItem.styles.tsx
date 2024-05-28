import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../../utils/focusUtils";

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
    alignContent: "center",

    "&:not(:last-child)": {
      marginBottom: "8px",
    },

    "&$condensed": {
      marginBottom: 0,
    },

    "&.HvIsFocused": {
      ...outlineStyles,
      backgroundColor: theme.colors.bgActive,
      zIndex: 2,
    },
  },
  focus: { backgroundColor: theme.colors.bgActive, zIndex: 2 },
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
      backgroundColor: theme.colors.bgHover,
    },
    "&$disabled": {
      cursor: "not-allowed",
    },
  },
  selected: { backgroundColor: theme.colors.bgHover },
  disabled: {
    color: theme.colors.textDisabled,
    backgroundColor: theme.colors.bgDisabled,
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
      fill: theme.colors.textDisabled,
    },
  },
  withEndAdornment: {
    "& > div": { float: "right" },

    "& svg": {
      boxShadow: "none !important",
      outline: "none !important",
    },
    "$disabled > svg *.color0": {
      fill: theme.colors.textDisabled,
    },
  },
});
