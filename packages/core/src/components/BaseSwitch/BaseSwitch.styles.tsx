import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import {
  Switch as MuiSwitch,
  switchClasses as MuiSwitchClasses,
} from "@mui/material";
import { outlineStyles } from "@core/utils";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledSwitch = styled(
  MuiSwitch,
  transientOptions
)(
  ({
    $focusVisible,
    $readOnly,
    $disabled,
  }: {
    $focusVisible: boolean;
    $readOnly: boolean;
    $disabled: boolean;
  }) => ({
    padding: theme.baseSwitch.padding,
    cursor: "pointer",
    width: theme.baseSwitch.width,
    height: theme.baseSwitch.height,
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: theme.baseSwitch.hoverBackgroundColor,
    },
    borderRadius: theme.baseSwitch.borderRadius,

    [`&.${MuiSwitchClasses.root}`]: {
      width: theme.baseSwitch.width,
      height: theme.baseSwitch.height,
      padding: theme.baseSwitch.padding,
    },

    [`& .${MuiSwitchClasses.switchBase}`]: {
      width: theme.baseSwitch.width,
      height: theme.baseSwitch.height,
      padding: theme.baseSwitch.padding,
      "&:hover": {
        backgroundColor: theme.baseSwitch.hoverBaseBackgroundColor,
      },
      [`&.${MuiSwitchClasses.checked}`]: {
        transform: "translateX(16px)",
        [`& + .${MuiSwitchClasses.track}`]: {
          opacity: theme.baseSwitch.checkedOpacity,
          backgroundColor: theme.baseSwitch.checkedTrackBackgroundColor,
        },
        "&:hover": {
          backgroundColor: theme.baseSwitch.hoverBaseBackgroundColor,
        },
      },
    },

    [`.${MuiSwitchClasses.track}`]: {
      opacity: theme.baseSwitch.track.opacity,
      borderRadius: theme.baseSwitch.track.borderRadius,
      height: theme.baseSwitch.track.height,
      width: theme.baseSwitch.track.width,
      border: theme.baseSwitch.track.border,
      backgroundColor: theme.baseSwitch.track.backgroundColor,
    },

    [`.${MuiSwitchClasses.thumb}`]: {
      position: "relative",
      left: theme.baseSwitch.thumb.left,
      width: theme.baseSwitch.thumb.width,
      height: theme.baseSwitch.thumb.height,
      border: theme.baseSwitch.thumb.border,
      backgroundColor: theme.baseSwitch.thumb.backgroundColor,
      marginLeft: theme.baseSwitch.thumb.marginLeft,
      marginTop: theme.baseSwitch.thumb.marginTop,
      boxShadow: theme.baseSwitch.thumb.boxShadow,
    },

    [`.${MuiSwitchClasses.disabled}`]: {
      [`& .${MuiSwitchClasses.thumb}`]: {
        backgroundColor: theme.baseSwitch.disabled.thumbBackgroundColor,
        border: theme.baseSwitch.disabled.thumbBorder,
      },
      [`&.${MuiSwitchClasses.switchBase} + .${MuiSwitchClasses.track}`]: {
        opacity: theme.baseSwitch.disabled.trackOpacity,
        backgroundColor: theme.baseSwitch.disabled.trackBackgroundColor,
        border: theme.baseSwitch.disabled.trackBorder,
      },
    },

    ...($readOnly && {
      [`.${MuiSwitchClasses.switchBase}`]: {
        cursor: "default",
      },
    }),

    ...($focusVisible && {
      borderRadius: theme.baseSwitch.focusBorderRadius,
      ...outlineStyles,
    }),

    ...($disabled && {
      [`&.${MuiSwitchClasses.root}`]: {
        cursor: "not-allowed",
      },
    }),
  })
);
