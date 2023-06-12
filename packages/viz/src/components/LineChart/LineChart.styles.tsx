import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-react-core";
import { HvLineChartClasses } from "./lineChartClasses";

export const styles: Partial<
  Record<keyof HvLineChartClasses, CSSInterpolation>
> = {
  tooltipRoot: {
    width: "fit-content",
    boxShadow: theme.colors.shadow,
    backgroundColor: theme.colors.atmo1,
  },
  tooltipTitleRoot: {
    padding: `15px ${theme.space.sm}`,
    borderBottom: `3px solid ${theme.colors.atmo2}`,
  },
  tooltipTitle: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
  tooltipContentRoot: {
    display: "flex",
    flexDirection: "column",
    padding: theme.space.sm,

    "& > *:not(:last-child)": { paddingBottom: theme.space.sm },
  },
  tooltipSeriesRoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tooltipSeriesNameRoot: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: theme.space.sm,
  },
  tooltipSeriesNameColor: {
    width: "10px",
    height: "10px",
    marginRight: "5px",
  },
  tooltipSeriesName: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
  tooltipSeriesValue: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
};
