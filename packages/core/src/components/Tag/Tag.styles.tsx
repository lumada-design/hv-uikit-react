import { theme } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";
import { hexToRgbA } from "@core/utils/hexToRgbA";
import { CSSProperties } from "react";

export const { staticClasses, useClasses } = createClasses("HvTag", {
  root: {},

  chipRoot: {
    "&.MuiChip-root": {
      height: 16,
      borderRadius: 0,
      maxWidth: 180,
      fontFamily: theme.fontFamily.body,

      "& $focusVisible": {
        backgroundColor: hexToRgbA(theme.colors.base_light, 0.3),
      },

      "&$categorical": {
        borderRadius: 8,
        "&$clickable": {
          cursor: "pointer",
        },
        "&:hover": {
          borderRadius: 8,
        },
        "& $label": {
          color: theme.colors.secondary,
        },
        "&:focus:not(:focus-visible)": {
          outline: "0 !important",
          boxShadow: "none !important",
        },
      },
    },

    "& .MuiChip-label": {
      paddingLeft: theme.space.xs,
      paddingRight: theme.space.xs,
      ...(theme.typography.caption1 as CSSProperties),
      color: theme.colors.base_dark,
      "& p": {
        color: theme.colors.base_dark,
      },
    },

    "& .MuiChip-deleteIcon": {
      marginRight: 0,
      width: 16,
      height: 16,
      minWidth: 16,
      minHeight: 16,
      padding: 0,
      "&:hover": {
        backgroundColor: hexToRgbA(theme.colors.base_light, 0.3),
      },
      "&:focus": {
        ...outlineStyles,
        borderRadius: 0,
      },
      "&:focus:not(:focus-visible)": {
        outline: "0 !important",
        boxShadow: "none !important",
      },
    },
  },

  focusVisible: {},

  button: {
    background: "transparent",
  },

  label: {},

  tagButton: {
    width: 16,
    height: 16,
    minWidth: 16,
    minHeight: 16,
    padding: 0,
    margin: 0,
  },

  deleteIcon: {},

  disabledDeleteIcon: {
    "&:hover": {
      backgroundColor: theme.colors.atmo3,
    },
    "&:focus": {
      backgroundColor: theme.colors.atmo3,
      outline: "none",
      boxShadow: "none",
      outlineOffset: 0,
    },
  },

  categorical: {},
  clickable: {},

  categoricalFocus: {
    "&:focus": {
      ...outlineStyles,
    },
  },

  disabled: {
    backgroundColor: theme.colors.atmo3,
    cursor: "not-allowed",
    "& $label": {
      color: theme.colors.secondary_60,
    },
  },

  categoricalDisabled: {
    backgroundColor: theme.colors.atmo3,
    cursor: "not-allowed",
    "& $label": {
      color: theme.colors.secondary_60,
    },
    "&:hover": {
      backgroundColor: theme.colors.atmo3,
    },
    "&:focus": {
      outline: "none",
    },
  },
});
