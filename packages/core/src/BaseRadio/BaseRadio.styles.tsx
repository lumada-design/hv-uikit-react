import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvBaseRadio", {
  root: {
    padding: 0,
    width: 32,
    minWidth: 32,
    height: 32,
    cursor: "pointer",
    borderRadius: "inherit",
    ":hover": {
      backgroundColor: theme.colors.bgHover,
    },
  },
  disabled: {
    cursor: "not-allowed",
    pointerEvents: "initial",
  },
  focusVisible: {
    "& svg": {
      borderRadius: theme.radii.full,
      ...outlineStyles,
    },
  },
  icon: {},
  checked: {},
  semantic: {},
});
