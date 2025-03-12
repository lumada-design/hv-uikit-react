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
      borderRadius: theme.radii.round,
    },

    "& svg": {
      width: 16,
      height: 16,
      color: theme.colors.bgContainer,
      borderRadius: theme.radii.base,
      border: `1px solid ${theme.colors.borderStrong}`,
    },
  },
  disabled: {
    "&$root": {
      cursor: "not-allowed",
      pointerEvents: "initial",
      "& svg": {
        color: theme.colors.bgDisabled,
        borderColor: theme.colors.borderDisabled,
        backgroundColor: theme.colors.bgDisabled,
      },
      "&:hover": {
        backgroundColor: "transparent",
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
      border: "transparent",
      backgroundColor: theme.colors.primaryStrong,
      color: theme.colors.bgContainer,
    },
    "&$disabled": {
      "& svg": {
        color: theme.colors.textDisabled,
        borderColor: "currentcolor",
      },
    },
  },
  indeterminate: {
    "& svg": {
      color: theme.colors.textSubtle,
    },
    "&$disabled": {
      "& svg": {
        color: theme.colors.textDisabled,
        borderColor: "currentcolor",
      },
    },
  },
  semantic: {
    "&$indeterminate": {
      "& svg": {
        backgroundColor: theme.colors.bgContainer,
        borderColor: theme.colors.borderStrong,
      },
    },
  },
});
