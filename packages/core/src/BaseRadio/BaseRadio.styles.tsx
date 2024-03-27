import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";
import { createClasses } from "../utils/classes";

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
      border: `1px solid ${theme.colors.secondary}`,
    },
    borderRadius: 0,
  },
  disabled: {
    cursor: "not-allowed",
    pointerEvents: "initial",
    "& svg": {
      border: `1px solid ${theme.colors.secondary_60}`,
      backgroundColor: theme.colors.atmo3,
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
      border: `1px solid ${theme.colors.secondary}`,
      backgroundColor: theme.colors.secondary,
      color: theme.colors.atmo2,
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
        border: `1px solid ${theme.colors.secondary_60}`,
        backgroundColor: theme.colors.secondary_60,
        color: theme.colors.atmo3,
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
