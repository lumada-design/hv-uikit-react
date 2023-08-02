import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvBaseSwitch", {
  root: {
    padding: theme.baseSwitch.padding,
    cursor: "pointer",
    width: theme.baseSwitch.width,
    height: theme.baseSwitch.height,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.baseSwitch.borderRadius,

    "&:hover": {
      backgroundColor: theme.baseSwitch.hoverBackgroundColor,
    },

    // Higher CSS specificity here
    "& $switchBase": {
      "&:hover": {
        backgroundColor: theme.baseSwitch.hoverBaseBackgroundColor,
      },

      "&$checked": {
        transform: "translateX(16px)",
        "& + $track": {
          opacity: theme.baseSwitch.checkedOpacity,
          backgroundColor: theme.baseSwitch.checkedTrackBackgroundColor,
        },
        "&:hover": {
          backgroundColor: theme.baseSwitch.hoverBaseBackgroundColor,
        },
      },
    },

    // Higher CSS specificity here
    "&$disabled": {
      "& $switchBase": {
        "& + $track": {
          opacity: theme.baseSwitch.disabled.trackOpacity,
          backgroundColor: theme.baseSwitch.disabled.trackBackgroundColor,
          border: theme.baseSwitch.disabled.trackBorder,
        },
      },
    },
  },
  switch: {
    width: theme.baseSwitch.width,
    height: theme.baseSwitch.height,
    padding: theme.baseSwitch.padding,

    "&$readOnly $switchBase": {
      cursor: "default",
    },
  },
  switchBase: {
    width: theme.baseSwitch.width,
    height: theme.baseSwitch.height,
    padding: theme.baseSwitch.padding,
  },
  track: {
    opacity: theme.baseSwitch.track.opacity,
    borderRadius: theme.baseSwitch.track.borderRadius,
    height: theme.baseSwitch.track.height,
    width: theme.baseSwitch.track.width,
    border: theme.baseSwitch.track.border,
    backgroundColor: theme.baseSwitch.track.backgroundColor,
  },
  thumb: {
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
  checked: {},
  disabled: {
    cursor: "not-allowed",

    "& $switch": {
      cursor: "not-allowed",
    },

    "& $thumb": {
      backgroundColor: theme.baseSwitch.disabled.thumbBackgroundColor,
      border: theme.baseSwitch.disabled.thumbBorder,
    },
  },
  readOnly: {},
  focusVisible: {
    borderRadius: theme.baseSwitch.focusBorderRadius,
    ...outlineStyles,
  },
});
