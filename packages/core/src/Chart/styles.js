const styles = theme => ({
  root: {
    padding: "40px",
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`
  },
  titleContainer: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  subtitle: {
    marginTop: `${theme.hv.spacing.xs}px`
  },
  defaultColors: {
    ...theme.hv.viz.palette.categorical
  },
  vizText: {
    ...theme.hv.typography.vizText,
    fontFamily: theme.hv.typography.fontFamily,
    fontSize: 10
  },
  lineColor: theme.hv.palette.atmosphere.atmo4,
  gridColor: theme.hv.palette.atmosphere.atmo5,
  paddingTop: {
    paddingTop: "20px"
  },
  plotColor: theme.hv.palette.atmosphere.atmo1
});

export default styles;
