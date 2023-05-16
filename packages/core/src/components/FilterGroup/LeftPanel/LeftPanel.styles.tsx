import { CSSInterpolation } from "@emotion/serialize";
import { HvFilterGroupLeftPanelClasses } from "./leftPanelClasses";

export const styles: Partial<
  Record<keyof HvFilterGroupLeftPanelClasses, CSSInterpolation>
> = {
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },
};
