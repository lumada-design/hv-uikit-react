import { outlineStyles } from "@core/utils";
import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import verticalScrollListItemClasses, {
  HvVerticalScrollListItemClasses,
} from "./verticalScrollListItemClasses";

export const styles: Partial<
  Record<keyof HvVerticalScrollListItemClasses, CSSInterpolation>
> = {
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
      backgroundColor: theme.scrollTo.dotHoverBackgroundColor,

      [`& .${verticalScrollListItemClasses.notSelected}`]: {
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
};
