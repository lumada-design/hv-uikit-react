import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-react-core";

export const styles: {
  contentContainer: CSSInterpolation;
  fixedHeight: CSSInterpolation;
  summaryRef: CSSInterpolation;
  summarySticky: CSSInterpolation;
  summaryContainer: CSSInterpolation;
} = {
  contentContainer: {
    position: "relative",
    padding: 20,
    marginLeft: 0,
    minHeight: 400,
    overflowX: "hidden",
  },
  fixedHeight: {
    minHeight: "calc(100vh - 387px)",
  },
  summaryRef: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
  },
  summarySticky: {
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  summaryContainer: {
    position: "absolute",
    top: 0,
    minWidth: 280,
    boxShadow: theme.colors.shadow,
    backgroundColor: theme.colors.atmo1,
    transition: "transform 0.3s",
    transitionTimingFunction: "ease-in-out",
    overflowY: "scroll",
  },
};
