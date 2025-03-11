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
      borderRadius: theme.radii.full,
      borderWidth: 1,
      borderColor: theme.colors.text,
      backgroundColor: theme.colors.bgContainer,
    },
    borderRadius: 0,
  },
  disabled: {
    cursor: "not-allowed",
    pointerEvents: "initial",
    "& svg": {
      borderColor: theme.colors.textDisabled,
      backgroundColor: theme.colors.bgDisabled,
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
      borderColor: theme.colors.text,
      backgroundColor: theme.colors.text,
      color: theme.colors.bgPage,
    },
    "&$semantic": {
      "& svg": {
        borderColor: theme.colors.textDark,
        backgroundColor: theme.colors.textLight,
        color: theme.colors.textDark,
      },
    },
    "&$disabled": {
      "& svg": {
        borderColor: theme.colors.textDisabled,
        backgroundColor: theme.colors.textDisabled,
        color: theme.colors.bgDisabled,
      },
    },
  },
  semantic: {
    "& svg": {
      borderColor: theme.colors.textDark,
      backgroundColor: theme.colors.textLight,
    },
  },
});
