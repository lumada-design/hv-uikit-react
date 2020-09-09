const styles = theme => ({
  root: {
    display: "flex",
    marginTop: "5px",
    marginBottom: "0px"
  },
  fixed: {
    position: "fixed",
    zIndex: theme.zIndex.drawer,
    top: "50px",
    bottom: 0
  },
  relative: {
    position: "relative",
    "&$withAnchorBar": {
      height: "100%"
    }
  },
  absolute: {
    position: "absolute"
  },
  static: {
    position: "static"
  },
  withAnchorBar: {
    height: "100%"
  },
  verticalContainer: {
    display: "flex",
    zIndex: 20
  },
  anchorBar: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    width: "52px",
    height: "100%",
    overflow: "hidden",
    padding: `${theme.hv.spacing.xs}px`
  },
  button: {
    marginTop: `${theme.hv.spacing.xs}px`,
    width: "32px",
    height: "32px"
  },
  separator: {
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    width: "3px"
  },
  contentContainer: {
    height: "100%",
    overflow: "auto",
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

export default styles;
