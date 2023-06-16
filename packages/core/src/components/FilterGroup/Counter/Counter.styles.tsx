import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvFilterGroupCounterClasses } from "./counterClasses";

export const styles: Partial<
  Record<keyof HvFilterGroupCounterClasses, CSSInterpolation>
> = {
  root: {
    lineHeight: "34px",
    marginRight: 10,
  },
  partialCounter: {
    display: "inline-block",
    fontWeight: theme.filterGroup.partialCounterFontWeight,
  },
};
