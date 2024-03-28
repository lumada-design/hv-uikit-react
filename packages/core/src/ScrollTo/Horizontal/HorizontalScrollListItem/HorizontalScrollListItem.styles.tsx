import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../../utils/classes";
import { outlineStyles } from "../../../utils/focusUtils";

const name = "HvHorizontalScrollListItem";

export const { staticClasses, useClasses } = createClasses(name, {
  root: {
    padding: "10px 0",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "48px",
    cursor: "pointer",
    borderBottom: "none",
    "&:hover": {
      backgroundColor: "transparent",

      "& $notSelected": {
        height: "6px",
        width: "6px",
        backgroundColor: theme.colors.secondary,
      },

      "& $notSelectedRoot": {
        backgroundColor: theme.colors.containerBackgroundHover,
      },
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
  text: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "48px",
    borderBottom: "none",

    "& p": {
      padding: "3px 10px",
      maxWidth: "120px",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
  selected: {
    borderBottom: "none",
  },
});
