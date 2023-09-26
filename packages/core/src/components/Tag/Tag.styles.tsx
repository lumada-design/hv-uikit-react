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

      "&:focus-visible": {
        backgroundColor: hexToRgbA(theme.colors.base_light, 0.3),
      },

      "&$categorical": {
        borderRadius: 8,
        "& $label": {
          color: theme.colors.secondary,
        },
      },
    },

    "&$disabled": {
      opacity: 1,
      backgroundColor: theme.colors.atmo3,
      "& $label": {
        color: theme.colors.secondary_60,
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
      padding: 0,
      "&:hover": {
        backgroundColor: theme.button.hoverColor,
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

  disabled: {},

  clickable: {
    cursor: "pointer",
    "&:focus-visible": {
      ...outlineStyles,
    },
  },

  categorical: {},

  label: {},

  deleteIcon: {},

  // TODO: redundant - use deleteIcon. remove in v6
  button: {},
  tagButton: {},
  // TODO: redundant - use $clickable or :not($disabled). remove in v6
  focusVisible: {},
  disabledDeleteIcon: {},
  categoricalFocus: {},
  categoricalDisabled: {},
});
