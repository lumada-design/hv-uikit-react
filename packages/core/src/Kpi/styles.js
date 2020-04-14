const styles = theme => ({
  root: {
    width: "100%",
    height: "100%"
  },
  visualIndicatorContainer: {
    height: "40px",
    backgroundColor: "transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  },
  comparisonContainer: {
    minHeight: "16px",
    display: "flex",
    alignItems: "flex-end"
  },
  indicatorsContainer: {
    display: "inline-flex",
    minHeight: "16px",
    alignItems: "flex-end",
    marginTop: `${theme.hv.spacing.xs}px`,
    marginBottom: `${theme.hv.spacing.xs}px`
  },
  indicatorUnit: {
    alignSelf: "flex-end",
    paddingBottom: "3px"
  },
  indicatorText: {},
  comparisonComposition: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  spacingToTheRight: {
    marginRight: `${theme.hv.spacing.xs}px`
  },
  trendLine: {
    float: "right"
  }
});

export default styles;
