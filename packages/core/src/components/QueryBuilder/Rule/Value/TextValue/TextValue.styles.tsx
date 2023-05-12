import { CSSInterpolation } from "@emotion/serialize";
import { HvTextValueClasses } from "./textValueClasses";

export const styles: Partial<
  Record<keyof HvTextValueClasses, CSSInterpolation>
> = {
  location: {
    flexGrow: 1,
  },
};
