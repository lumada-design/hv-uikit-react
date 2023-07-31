import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

const name = "HvHorizontalScrollListItem";

export const { staticClasses, useClasses } = createClasses(name, {
  root: {
    padding: "10px 0",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.scrollTo.horizontal.buttonHeight,
    cursor: "pointer",
    borderBottom: theme.scrollTo.horizontal.buttonBottomBorder,
    "&:hover": {
      backgroundColor: theme.scrollTo.horizontal.buttonHoverBackgroundColor,

      "& $notSelected": {
        height: theme.scrollTo.dotHoverSize,
        width: theme.scrollTo.dotHoverSize,
        backgroundColor: theme.scrollTo.dotHoverColor,
      },

      "& $notSelectedRoot": {
        backgroundColor: theme.scrollTo.dotHoverBackgroundColor,
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
    height: theme.scrollTo.horizontal.buttonHeight,
    borderBottom: theme.scrollTo.horizontal.buttonBottomBorder,

    "& p": {
      padding: theme.scrollTo.horizontal.textPadding,
      maxWidth: theme.scrollTo.horizontal.textMaxWidth,
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
  selected: {
    borderBottom: theme.scrollTo.horizontal.selectedButtonBottomBorder,
  },
});
