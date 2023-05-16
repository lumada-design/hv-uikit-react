import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvFilterGroupCounterClasses } from "./counterClasses";

export const styles: Partial<
  Record<keyof HvFilterGroupCounterClasses, CSSInterpolation>
> = {
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
