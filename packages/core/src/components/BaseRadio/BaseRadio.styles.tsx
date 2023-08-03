import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvBaseRadio", {
  root: {
    padding: 0,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.baseRadio.hoverColor,
      borderRadius: theme.baseRadio.hoverBorderRadius,
    },
    borderRadius: 0,
  },
  disabled: {
    cursor: "not-allowed",
    pointerEvents: "initial",
    "& svg": {
      "& path:nth-of-type(2)": {
        fill: theme.colors.secondary_60,
      },
    },
  },
  focusVisible: {
    "& svg": {
      borderRadius: "8px",
      ...outlineStyles,
    },
  },
  icon: {},
});
