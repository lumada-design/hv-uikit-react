import { outlineStyles } from "@core/utils";
import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import scrollToHorizontalClasses from "../scrollToHorizontalClasses";
import { HvHorizontalScrollListItemClasses } from "./horizontalScrollListItemClasses";

export const styles: Partial<
  Record<keyof HvHorizontalScrollListItemClasses, CSSInterpolation>
> = {
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

      [`& .${scrollToHorizontalClasses.notSelected}`]: {
        height: theme.scrollTo.dotHoverSize,
        width: theme.scrollTo.dotHoverSize,
        backgroundColor: theme.scrollTo.dotHoverColor,
      },

      [`& .${scrollToHorizontalClasses.notSelectedRoot}`]: {
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
};
