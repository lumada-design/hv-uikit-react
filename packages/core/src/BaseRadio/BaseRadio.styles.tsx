import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvBaseRadio", {
  root: {
    padding: 0,
    width: 32,
    minWidth: 32,
    height: 32,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
      borderRadius: theme.radii.base,
    },
    "& svg": {
      width: 16,
      height: 16,
      borderRadius: theme.radii.circle,
      border: `1px solid ${theme.colors.text}`,
      backgroundColor: theme.colors.bgSurface,
    },
    borderRadius: 0,
  },
  disabled: {
    cursor: "not-allowed",
    pointerEvents: "initial",
    "& svg": {
      border: `1px solid ${theme.colors.textDisabled}`,
      backgroundColor: theme.colors.bgAction,
    },
  },
  focusVisible: {
    "& svg": {
      borderRadius: "8px",
      ...outlineStyles,
    },
  },
  icon: {},
  checked: {
    "& svg": {
      border: `1px solid ${theme.colors.text}`,
      backgroundColor: theme.colors.text,
      color: theme.colors.bgPage,
    },
    "&$semantic": {
      "& svg": {
        border: `1px solid ${theme.colors.base_dark}`,
        backgroundColor: theme.colors.base_light,
        color: theme.colors.base_dark,
      },
    },
    "&$disabled": {
      "& svg": {
        border: `1px solid ${theme.colors.textDisabled}`,
        backgroundColor: theme.colors.textDisabled,
        color: theme.colors.bgAction,
      },
    },
  },
  semantic: {
    "& svg": {
      border: `1px solid ${theme.colors.base_dark}`,
      backgroundColor: theme.colors.base_light,
    },
  },
});
