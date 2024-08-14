import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvKpi", {
  root: { width: "100%", height: "100%" },
  visualIndicatorContainer: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    backgroundColor: "transparent",
  },
  comparisons: {},
  comparisonContainer: {
    minHeight: "16px",
    display: "flex",
    alignItems: "flex-end",
  },
  comparisonComposition: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  indicatorsContainer: {
    display: "inline-flex",
    minHeight: "16px",
    alignItems: "flex-end",
  },
  indicatorText: {},
  indicatorUnit: { alignSelf: "flex-end", paddingBottom: "3px" },
  spacingToTheRight: { marginRight: theme.space.xs },
  trendLine: { float: "right" },
});
