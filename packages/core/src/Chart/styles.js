const styles = (theme) => ({
  root: {
    padding: 0,
  },
  defaultColors: {
    ...theme.hv.viz.palette.categorical,
  },
  vizText: {
    ...theme.hv.typography.vizText,
    fontFamily: theme.hv.typography.fontFamily,
    fontSize: 10,
  },
  legendText: {
    ...theme.hv.typography.normalText,
  },
  lineColor: theme.hv.palette.atmosphere.atmo4,
  gridColor: theme.hv.palette.atmosphere.atmo4,
  plotColor: "transparent",
});

export default styles;
