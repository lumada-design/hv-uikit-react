import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvFilterGroupRightPanelClasses } from "./rightPanelClasses";

export const styles: Partial<
  Record<keyof HvFilterGroupRightPanelClasses, CSSInterpolation>
> = {
  search: {
    marginBottom: theme.spacing("xs"),
  },
  list: {
    width: "calc(100% + 8px)",
    height: "calc(100% - 70px)",
    overflowY: "auto",
    margin: -4,
    padding: 4,
  },
  selectAllContainer: {
    // Prevent the focus ring to be hidden by sibling hover background
    "&": {
      position: "relative",
      zIndex: 0,
    },
    "&:focus-within": {
      zIndex: 1,
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      zIndex: 1,
    },
  },
  selectAll: {
    width: "100%",
  },
};
