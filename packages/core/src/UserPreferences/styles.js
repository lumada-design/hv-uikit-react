const styles = theme => ({
  root: {
    display: "flex",
    marginTop: "5px",
    marginBottom: "0px",
    zIndex: theme.zIndex.drawer
  },
  fixed: {
    position: "fixed",
    top: "50px",
    bottom: 0
  },
  relative: {
    position: "relative"
  },
  absolute: {
    position: "absolute"
  },
  static: {
    position: "static"
  },
  container: {
    display: "flex",
    zIndex: 20,
    boxShadow: theme.hv.shadows[1]
  },
  contentContainer: {
    paddingTop: theme.hv.spacing.sm,
    paddingBottom: theme.hv.spacing.sm,
    height: "100%",
    minWidth: "320px",
    overflow: "auto",
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  userInfo: {
    paddingLeft: theme.hv.spacing.sm,
    paddingRight: theme.hv.spacing.sm,
    marginBottom: theme.hv.spacing.xs,
    " & > :not(:first-child)": {
      paddingTop: "5px"
    }
  }
});

export default styles;
