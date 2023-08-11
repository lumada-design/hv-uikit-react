import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvNavigation", {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    userSelect: "none",
    width: "32px",
    height: "32px",
    "&:hover": {
      backgroundColor: theme.colors.atmo3,
      cursor: "pointer",
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      backgroundColor: theme.colors.atmo3,
      cursor: "pointer",
      ...outlineStyles,
    },
  },
  disabled: {},
  text: {
    width: "calc(100% - 64px)",
    textAlign: "center",
    height: "32px",
    padding: "8px 0",
    "&:hover": {
      backgroundColor: theme.colors.atmo3,
      cursor: "pointer",
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      backgroundColor: theme.colors.atmo3,
      cursor: "pointer",
      ...outlineStyles,
    },
  },
  textWithoutHover: {
    width: "calc(100% - 64px)",
    textAlign: "center",
    padding: "0 5px",
    outline: "none",
  },
});
