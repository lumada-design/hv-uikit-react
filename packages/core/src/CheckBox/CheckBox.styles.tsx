import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvCheckBox", {
  root: { display: "inline-block" },
  container: {
    cursor: "pointer",
    display: "flex",
    height: "32px",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

    "&:hover": {
      backgroundColor: theme.colors.bgHover,
      borderRadius: theme.radii.base,
    },
  },
  disabled: {
    cursor: "not-allowed",
    "& $label": { color: theme.colors.textDisabled, cursor: "not-allowed" },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  focusVisible: {
    ...outlineStyles,

    "& div": {
      backgroundColor: theme.colors.bgPageSecondary,
    },

    [`& $checkbox div > svg`]: {
      outline: "none",
      boxShadow: "none",
    },
  },
  invalidContainer: {
    borderBottom: `1px solid ${theme.form.errorColor}`,

    "&:hover": {
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px",
    },
  },
  checkbox: { height: "32px" },
  invalidCheckbox: {
    "::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 1,
      background: theme.colors.negativeDeep,
    },
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
