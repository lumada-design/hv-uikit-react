import { outlineStyles } from "@core/utils/focusUtils";
import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

const name = "HvVerticalScrollListItem";

export const { staticClasses, useClasses } = createClasses(name, {
  root: {
    padding: "0",
    height: "32px",
    width: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  notSelected: {
    height: theme.scrollTo.dotNotSelectedSize,
    width: theme.scrollTo.dotNotSelectedSize,
    borderRadius: "50%",
    display: "inline-block",
    backgroundColor: theme.scrollTo.dotNotSelectedColor,
  },
  text: {
    height: theme.scrollTo.dotRootSize,
    width: theme.scrollTo.dotRootSize,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.scrollTo.dotRootSize,
    width: theme.scrollTo.dotRootSize,
    borderRadius: theme.scrollTo.dotRootRadius,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,

      "& $notSelected": {
        height: theme.scrollTo.dotHoverSize,
        width: theme.scrollTo.dotHoverSize,
        backgroundColor: theme.scrollTo.dotHoverColor,
      },
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
});
