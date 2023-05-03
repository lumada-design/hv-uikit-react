import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";

export const styles: {
  root: CSSInterpolation;
  positionSticky: CSSInterpolation;
  positionFixed: CSSInterpolation;
  notSelectedRoot: CSSInterpolation;
  notSelected: CSSInterpolation;
  selected: CSSInterpolation;
} = {
  root: {
    display: "flex",
    padding: "0 30px",
    listStyleType: "none",
    flexWrap: "wrap",
    backdropFilter: `blur(${theme.scrollTo.backgroundColorBlur})`,
  },
  positionSticky: {
    position: "sticky",
    zIndex: `calc(${theme.zIndices.banner} - 2)`,
    top: 0,
    left: 0,
  },
  positionFixed: {
    position: "fixed",
    zIndex: `calc(${theme.zIndices.banner} - 2)`,
    top: 0,
    left: 0,
  },
  notSelectedRoot: {
    display: theme.scrollTo.horizontal.dotDisplay,
    justifyContent: "center",
    alignItems: "center",
    height: theme.scrollTo.dotRootSize,
    width: theme.scrollTo.dotRootSize,
    borderRadius: theme.scrollTo.dotRootRadius,
  },
  notSelected: {
    height: theme.scrollTo.dotNotSelectedSize,
    width: theme.scrollTo.dotNotSelectedSize,
    borderRadius: "50%",
    display: "inline-block",
    backgroundColor: theme.scrollTo.dotNotSelectedColor,
  },
  selected: {
    display: theme.scrollTo.horizontal.dotDisplay,
    height: theme.scrollTo.dotRootSize,
    width: theme.scrollTo.dotRootSize,
  },
};
