import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import Chip from "@mui/material/Chip";
import { HvButton } from "components";
import { outlineStyles } from "utils";
import fade from "utils/hexToRgbA";
import { transientOptions } from "utils/transientOptions";

export const StyledChip = styled(
  Chip,
  transientOptions
)(
  ({
    $type,
    $disabled,
    $categoricalFocus,
    $categoricalDisabled,
    $base1Color,
  }: {
    $type: string;
    $disabled: boolean;
    $categoricalFocus: boolean;
    $categoricalDisabled: boolean;
    $base1Color: string;
  }) => ({
    "&.MuiChip-root": {
      height: 16,
      borderRadius: 0,
      maxWidth: 180,
      fontFamily: theme.fontFamily.body,
      "& $focusVisible": {
        backgroundColor: fade(theme.colors.base1, 0.3),
      },
      ...($type === "categorical" && {
        borderRadius: 8,
        "&$clickable": {
          cursor: "pointer",
        },
        "&:hover": {
          borderRadius: 8,
        },
        "& $label > p": {
          color: theme.colors.acce1,
        },
        "&:focus:not(:focus-visible)": {
          outline: "0 !important",
          boxShadow: "none !important",
        },
      }),
      ...($disabled && {
        backgroundColor: theme.colors.atmo3,
        cursor: "not-allowed",
        "& $label > p": {
          color: theme.colors.atmo5,
        },
      }),
      ...($categoricalFocus && {
        "&:focus": {
          ...outlineStyles,
        },
      }),
      ...($categoricalDisabled && {
        backgroundColor: theme.colors.atmo3,
        cursor: "not-allowed",
        "& $label > p": {
          color: theme.colors.atmo5,
        },
        "&:hover": {
          backgroundColor: theme.colors.atmo3,
        },
        "&:focus": {
          outline: "none",
        },
      }),
    },

    "& .MuiChip-label": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 400,
      color: theme.colors.base2,
      "& p": {
        color: theme.colors.base2,
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
        backgroundColor: `${$base1Color}30`,
      },
      "&:focus": {
        ...outlineStyles,
        borderRadius: 0,
      },
      "&:focus:not(:focus-visible)": {
        outline: "0 !important",
        boxShadow: "none !important",
      },
      ...($disabled && {
        "&:hover": {
          backgroundColor: theme.colors.atmo3,
        },
        "&:focus": {
          backgroundColor: theme.colors.atmo3,
          outline: "none",
          boxShadow: "none",
          outlineOffset: 0,
        },
      }),
    },
  })
);

export const StyledButton = styled(HvButton)({
  "& .MuiButton-startIcon": {
    width: 16,
    height: 16,
    minWidth: 16,
    minHeight: 16,
    padding: 0,
    margin: 0,
  },
  "& .MuiButton-textPrimary": {
    background: "transparent",
  },
});
