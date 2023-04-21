import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";

export const styles: {
  root: CSSInterpolation;
  partialCounter: CSSInterpolation;
} = {
  root: {
    height: "100%",
    lineHeight: "32px",
    margin: "0 10px",
    pointerEvents: "none",
  },
  partialCounter: {
    display: "inline-block",
    fontWeight: theme.filterGroup.partialCounterFontWeight,
  },
};
