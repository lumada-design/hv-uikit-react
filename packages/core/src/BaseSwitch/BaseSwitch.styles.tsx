import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

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
      backgroundColor: theme.colors.bgHover,
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
          backgroundColor: theme.colors.text,
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
          backgroundColor: theme.colors.bgActive,
          border: `solid 1px ${theme.colors.textDisabled}`,
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
    border: `solid 1px ${theme.colors.text}`,
    backgroundColor: theme.colors.bgSurface,
  },
  thumb: {
    position: "relative",
    left: "-9px",
    width: "12px",
    height: "12px",
    border: `solid 1px ${theme.colors.text}`,
    backgroundColor: theme.colors.bgSurface,
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
      backgroundColor: theme.colors.bgActive,
      border: `solid 1px ${theme.colors.textDisabled}`,
    },
  },
  readOnly: {},
  focusVisible: {
    borderRadius: "8px",
    ...outlineStyles,
  },
});
