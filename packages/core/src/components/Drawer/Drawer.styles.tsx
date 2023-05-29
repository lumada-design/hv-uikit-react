import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvDrawerClasses } from "./drawerClasses";

export const styles: Partial<Record<keyof HvDrawerClasses, CSSInterpolation>> =
  {
    paper: {
      backgroundColor: theme.colors.atmo1,
      padding: 0,
      overflow: "auto",
      boxShadow: theme.colors.shadow,
    },
    closeButton: {
      padding: 0,
      minWidth: "inherit",
      position: "absolute",
      top: theme.spacing("sm"),
      right: theme.spacing("sm"),
    },
  };
