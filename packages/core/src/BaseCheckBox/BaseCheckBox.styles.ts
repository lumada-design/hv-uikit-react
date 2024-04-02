import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
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
      backgroundColor: theme.colors.containerBackgroundHover,
    },

    "& svg": {
      width: 16,
      height: 16,
      color: theme.colors.atmo1,
      borderRadius: theme.radii.none,
      border: `1px solid ${theme.colors.secondary}`,
    },
  },
  disabled: {
    "&$root": {
      cursor: "not-allowed",
      pointerEvents: "initial",
      "& svg": {
        color: theme.colors.atmo3,
        borderColor: theme.colors.secondary_60,
        backgroundColor: theme.colors.atmo3,
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
      border: `1px solid ${theme.colors.secondary}`,
      backgroundColor: theme.colors.secondary,
      color: theme.colors.atmo1,
    },
    "&$disabled": {
      "& svg": {
        color: theme.colors.secondary_60,
      },
    },
  },
  indeterminate: {
    "& svg": {
      color: theme.colors.secondary,
    },
    "&$disabled": {
      "& svg": {
        color: theme.colors.secondary_60,
      },
    },
  },
  semantic: {
    "& svg": {
      border: `1px solid ${theme.colors.base_dark}`,
      color: theme.colors.base_light,
      backgroundColor: theme.colors.base_dark,
    },
    "&$indeterminate": {
      "& svg": {
        color: theme.colors.base_dark,
        backgroundColor: theme.colors.base_light,
      },
    },
  },
});
