import { CSSInterpolation } from "@emotion/serialize";
import { HvCardMediaClasses } from "./mediaClasses";

export const styles: Partial<
  Record<keyof HvCardMediaClasses, CSSInterpolation>
> = {
  root: { width: "100%" },
};
