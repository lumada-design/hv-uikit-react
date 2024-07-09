import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvButtonBase", {
  root: {
    display: "inline-flex",
    cursor: "pointer",
    background: "none",
    padding: 0,

    // Background color common for almost all variants
    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
    "&:focus-visible": {
      ...outlineStyles,
      backgroundColor: theme.colors.containerBackgroundHover,
    },

    // Default button - no size specified
    fontFamily: theme.fontFamily.body,
    fontSize: "inherit",
    color: "inherit",
  },
  disabled: {
    cursor: "not-allowed",
    color: theme.colors.secondary_60,
    "&:hover, &:focus-visible": {
      backgroundColor: "transparent",
    },
  },
});
