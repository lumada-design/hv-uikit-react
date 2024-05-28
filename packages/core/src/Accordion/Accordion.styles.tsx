import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvAccordion", {
  root: {
    "& + root": {
      paddingTop: 8,
    },
  },
  hidden: { height: 0, display: "none" },
  container: { paddingTop: 8, height: "auto" },
  label: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",

    "&[disabled], &:active": {
      outline: "none",
    },

    "&:focus": {
      outline: "none",
      background: theme.colors.bgActive,
    },

    "&:hover": {
      background: theme.colors.bgActive,
    },

    "&:focus-visible": {
      ...outlineStyles,
    },

    cursor: "pointer",
  },
  disabled: {
    cursor: "not-allowed",
    color: theme.colors.textDisabled,

    "&:focus": {
      background: "none",
    },

    "&:hover": {
      background: "none",
    },
  },
});
