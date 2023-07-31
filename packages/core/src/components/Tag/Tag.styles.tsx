import styled from "@emotion/styled";

import { CSSProperties, forwardRef } from "react";

import { CloseXS } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import Chip from "@mui/material/Chip";

import { HvButton, HvButtonProps } from "@core/components/Button";
import { outlineStyles } from "@core/utils/focusUtils";
import { hexToRgbA } from "@core/utils/hexToRgbA";
import { transientOptions } from "@core/utils/transientOptions";
import { PolymorphicRef } from "@core/types/generic";

import tagClasses from "./tagClasses";

export const StyledChip = styled(
  Chip,
  transientOptions
)(
  ({
    $type,
    $disabled,
    $categoricalFocus,
    $categoricalDisabled,
    $baseLightColor,
  }: {
    $type: string;
    $disabled: boolean;
    $categoricalFocus: boolean;
    $categoricalDisabled: boolean;
    $baseLightColor: string;
  }) => ({
    "&.MuiChip-root": {
      height: 16,
      borderRadius: 0,
      maxWidth: 180,
      fontFamily: theme.fontFamily.body,

      [`& .${tagClasses.focusVisible}`]: {
        backgroundColor: hexToRgbA(theme.colors.base_light, 0.3),
      },
      ...($type === "categorical" && {
        backgroundColor: "red",
        borderRadius: 8,
        [`&.${tagClasses.clickable}`]: {
          cursor: "pointer",
        },
        "&:hover": {
          borderRadius: 8,
        },
        [`& .${tagClasses.label}`]: {
          color: theme.colors.secondary,
        },
        "&:focus:not(:focus-visible)": {
          outline: "0 !important",
          boxShadow: "none !important",
        },
      }),
      ...($disabled && {
        backgroundColor: theme.colors.atmo3,
        cursor: "not-allowed",
        [`& .${tagClasses.label}`]: {
          color: theme.colors.secondary_60,
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
        [`& .${tagClasses.label}`]: {
          color: theme.colors.secondary_60,
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
        backgroundColor: `${$baseLightColor}30`,
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

export const StyledButton = styled(
  forwardRef((props: HvButtonProps, ref?: PolymorphicRef<"button">) => {
    return <HvButton {...props} ref={ref} />;
  })
)({
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

export const StyledCloseXS = styled(
  CloseXS,
  transientOptions
)(({ $color }: { $color: string }) => ({
  "& svg .color0": {
    fill: theme.colors[$color],
  },
}));
