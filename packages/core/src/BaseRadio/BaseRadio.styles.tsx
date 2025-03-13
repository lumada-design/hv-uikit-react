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
    "& svg": {
      width: 16,
      height: 16,
      borderRadius: theme.radii.full,
      border: `1px solid ${theme.colors.borderStrong}`,
      backgroundColor: theme.colors.bgContainer,
    },
    "&:hover": {
      backgroundColor: theme.colors.bgHover,
      borderRadius: theme.radii.round,
    },
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
      borderColor: "transparent",
      backgroundColor: theme.colors.primaryStrong,
      color: theme.colors.bgContainer,
    },
    // "&$semantic": {
    //   "& svg": {
    //     borderColor: theme.colors.textDark,
    //     backgroundColor: theme.colors.textLight,
    //     color: theme.colors.textDark,
    //   },
    // },
    "&$disabled": {
      "& svg": {
        borderColor: "transparent",
        backgroundColor: theme.colors.borderDisabled,
        color: theme.colors.bgDisabled,
      },
    },
  },
  semantic: {
    // "& svg": {
    //   borderColor: theme.colors.borderStrong,
    //   backgroundColor: theme.colors.bgContainer,
    // },
  },
});
