import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";
import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvBaseSwitch", {
  root: {
    padding: 0,
    cursor: "pointer",
    width: "40px",
    height: "32px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.base,

    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },

    // Higher CSS specificity here
    "& $switchBase": {
      "&:hover": {
        backgroundColor: "transparent",
      },

      "&$checked": {
        transform: "translateX(16px)",
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.colors.secondary,
        },
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },

    // Higher CSS specificity here
    "&$disabled": {
      "& $switchBase": {
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.colors.atmo3,
          border: `solid 1px ${theme.colors.secondary_60}`,
        },
      },
    },
  },
  switch: {
    width: "40px",
    height: "32px",
    padding: 0,

    "&$readOnly $switchBase": {
      cursor: "default",
    },
  },
  switchBase: {
    width: "40px",
    height: "32px",
    padding: 0,
  },
  track: {
    opacity: 1,
    borderRadius: "15px",
    height: "16px",
    width: "32px",
    border: `solid 1px ${theme.colors.secondary}`,
    backgroundColor: theme.colors.atmo1,
  },
  thumb: {
    position: "relative",
    left: "-9px",
    width: "12px",
    height: "12px",
    border: `solid 1px ${theme.colors.secondary}`,
    backgroundColor: theme.colors.atmo1,
    marginLeft: "2px",
    marginTop: 0,
    boxShadow: "none",
  },
  checked: {},
  disabled: {
    cursor: "not-allowed",

    "& $switch": {
      cursor: "not-allowed",
    },

    "& $thumb": {
      backgroundColor: theme.colors.atmo3,
      border: `solid 1px ${theme.colors.secondary_60}`,
    },
  },
  readOnly: {},
  focusVisible: {
    borderRadius: "8px",
    ...outlineStyles,
  },
});
