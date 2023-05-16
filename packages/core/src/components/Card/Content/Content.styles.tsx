import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvCardContentClasses } from "./contentClasses";

export const styles: Partial<
  Record<keyof HvCardContentClasses, CSSInterpolation>
> = {
  content: {
    padding: `0 ${theme.space.sm} 15px ${theme.space.sm}`,
    "&:last-child": {
      paddingBottom: theme.space.sm,
    },
  },
};
