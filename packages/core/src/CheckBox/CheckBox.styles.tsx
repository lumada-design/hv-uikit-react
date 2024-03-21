import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";
import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvCheckBox", {
  root: { display: "inline-block" },
  container: {
    cursor: "pointer",
    display: "flex",
    height: "32px",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
      borderRadius: theme.radii.base,
    },
  },
  disabled: {
    cursor: "not-allowed",
    "& $label": { color: theme.colors.secondary_60, cursor: "not-allowed" },
  },
  focusVisible: {
    ...outlineStyles,

    "& div": {
      backgroundColor: theme.colors.atmo3,
    },

    [`& $checkbox div > svg`]: {
      outline: "none",
      boxShadow: "none",
    },
  },
  invalidContainer: {
    borderBottom: `1px solid ${theme.colors.negative}`,

    "&:hover": {
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px",
    },
  },
  checkbox: { height: "32px" },
  invalidCheckbox: {
    borderBottom: `1px solid ${theme.colors.negative}`,
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  },
  label: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    verticalAlign: "middle",
    paddingRight: theme.space.xs,
    whiteSpace: "nowrap",
    ...theme.typography.body,
    cursor: "pointer",
    height: "32px",
    lineHeight: "32px",
    width: "100%",
  },
  checked: {},
  indeterminate: {},
  semantic: {},
});
