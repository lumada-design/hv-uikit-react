import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvBaseCheckBox", {
  root: {
    padding: 0,
    borderRadius: theme.baseCheckBox.borderRadius,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.baseCheckBox.hoverColor,
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
