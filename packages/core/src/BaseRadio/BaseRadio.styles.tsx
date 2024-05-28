import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvBaseRadio", {
  root: {
    padding: 0,
    width: 32,
    minWidth: 32,
    height: 32,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.colors.bgHover,
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
      backgroundColor: theme.colors.bgActive,
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
        color: theme.colors.bgActive,
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
