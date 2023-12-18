import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";
import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvBaseCheckBox", {
  root: {
    padding: 0,
    borderRadius: theme.radii.base,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
  },
  disabled: {
    "&$root": {
      cursor: "not-allowed",
      pointerEvents: "initial",
    },

    "& svg": {
      "& path:nth-of-type(2)": {
        fill: theme.colors.secondary_60,
      },
    },
  },
  focusVisible: {
    "& svg": {
      ...outlineStyles,
    },
  },
  icon: {},
});
