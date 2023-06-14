import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-react-core";
import { HvLineChartClasses } from "./lineChartClasses";

export const singleStyles: Partial<
  Record<keyof HvLineChartClasses, CSSInterpolation>
> = {
  tooltipRoot: {
    width: "fit-content",
    boxShadow: theme.colors.shadow,
    backgroundColor: theme.colors.atmo1,
    padding: theme.space.sm,
    display: "flex",
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
    marginLeft: theme.space.xs,
  },
};

export const multipleStyles: Partial<
  Record<keyof HvLineChartClasses, CSSInterpolation>
> = {
  tooltipRoot: {
    width: "fit-content",
    boxShadow: theme.colors.shadow,
    backgroundColor: theme.colors.atmo1,
  },
  tooltipTitleContainer: {
    padding: `15px ${theme.space.sm}`,
    borderBottom: `3px solid ${theme.colors.atmo2}`,
  },
  tooltipTitle: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
  tooltipValuesContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.space.sm,

    "& > *:not(:last-child)": { paddingBottom: theme.space.sm },
  },
  tooltipSeriesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tooltipSeriesNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: theme.space.sm,
  },
  tooltipSeriesColor: {
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
