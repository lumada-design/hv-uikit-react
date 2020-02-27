const styles = theme => ({
  root: {
    backgroundColor: theme.hv.palette.atmosphere.atmo2
  },
  mainContainer: {
    display: "flex",
    backgroundColor: theme.hv.palette.atmosphere.atmo3
  },
  navContainer: {
    maxWidth: "200px",
    paddingTop: `${theme.hv.spacing.md}px`
  },
  componentContainer: {
    width: "100%",
    maxHeight: "400px",
    overflowY: "auto",
    padding: `${theme.hv.spacing.md}px`
  },
  title: {
    padding: `${theme.hv.spacing.sm}px 0`
  },
  footer: {
    padding: `${theme.hv.spacing.sm}px`,
    textAlign: "right"
  }
});

export default styles;
