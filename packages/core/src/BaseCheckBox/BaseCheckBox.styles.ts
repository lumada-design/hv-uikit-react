import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvBaseCheckBox", {
  root: {
    padding: 0,
    width: 32,
    minWidth: 32,
    height: 32,
    borderRadius: theme.radii.base,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.bgHover,
    },

    "& svg": {
      width: 16,
      height: 16,
      color: theme.colors.bgContainer,
      borderRadius: theme.radii.none,
      border: `1px solid ${theme.colors.text}`,
    },
  },
  disabled: {
    "&$root": {
      cursor: "not-allowed",
      pointerEvents: "initial",
      "& svg": {
        color: theme.colors.bgDisabled,
        borderColor: theme.colors.textDisabled,
        backgroundColor: theme.colors.bgDisabled,
      },
    },
  },
  focusVisible: {
    "& svg": {
      ...outlineStyles,
    },
  },
  icon: {},
  checked: {
    "& svg": {
      border: `1px solid ${theme.colors.text}`,
      backgroundColor: theme.colors.text,
      color: theme.colors.bgContainer,
    },
    "&$disabled": {
      "& svg": {
        color: theme.colors.textDisabled,
      },
    },
  },
  indeterminate: {
    "& svg": {
      color: theme.colors.text,
    },
    "&$disabled": {
      "& svg": {
        color: theme.colors.textDisabled,
      },
    },
  },
  semantic: {
    "& svg": {
      border: `1px solid ${theme.colors.textDark}`,
      color: theme.colors.textLight,
      backgroundColor: theme.colors.textDark,
    },
    "&$indeterminate": {
      "& svg": {
        color: theme.colors.textDark,
        backgroundColor: theme.colors.textLight,
      },
    },
  },
});
