import { theme, createClasses } from "@hitachivantara/uikit-react-core";

export const { useClasses, staticClasses } = createClasses("HvLineChart", {
  /** Single tooltip styles */
  singleTooltipRoot: {
    width: "fit-content",
    boxShadow: theme.colors.shadow,
    backgroundColor: theme.colors.atmo1,
    padding: theme.space.sm,
    display: "flex",
  },
  singleTooltipTitle: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
  singleTooltipValue: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
    marginLeft: theme.space.xs,
  },
  /** Multiple tooltip styles */
  multipleTooltipRoot: {
    width: "fit-content",
    boxShadow: theme.colors.shadow,
    backgroundColor: theme.colors.atmo1,
  },
  multipleTooltipTitleContainer: {
    padding: `15px ${theme.space.sm}`,
    borderBottom: `3px solid ${theme.colors.atmo2}`,
  },
  multipleTooltipTitle: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
  multipleTooltipValuesContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.space.sm,

    "& > *:not(:last-child)": { paddingBottom: theme.space.sm },
  },
  multipleTooltipSeriesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  multipleTooltipSeriesNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: theme.space.sm,
  },
  multipleTooltipSeriesColor: {
    width: "10px",
    height: "10px",
    marginRight: "5px",
  },
  multipleTooltipSeriesName: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
  multipleTooltipSeriesValue: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
});
