import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvBannerClasses } from "./bannerClasses";

export const styles: Partial<Record<keyof HvBannerClasses, CSSInterpolation>> =
  {
    rootClosed: {
      display: "none",
    },
    root: {
      minWidth: `calc(100% - ${theme.space.sm})`,
    },
    anchorOriginTopCenter: {
      top: theme.space.xs,
    },
    anchorOriginBottomCenter: {
      bottom: theme.space.xs,
    },
  };
