import { CSSInterpolation } from "@emotion/serialize";
import { HvFilterGroupClasses } from "./filterGroupClasses";

export const styles: Partial<
  Record<keyof HvFilterGroupClasses, CSSInterpolation>
> = {
  label: {
    display: "flex",
    alignItems: "flex-start",
  },
  labelContainer: { display: "flex", alignItems: "flex-start" },
};
