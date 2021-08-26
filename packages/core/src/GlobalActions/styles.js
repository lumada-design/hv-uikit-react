const styles = (theme) => ({
  root: {
    position: "relative",
  },
  positionSticky: {
    width: "100%",
    position: "sticky",
  },
  positionFixed: {
    width: "100%",
    position: "fixed",

    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 2*${theme.spacing(4)}px)`,
      marginLeft: `${theme.spacing(4)}px`,
      marginRight: `${theme.spacing(4)}px`,
    },
    [theme.breakpoints.down("sm")]: {
      width: `calc(100% - 2*${theme.spacing(2)}px)`,
      marginLeft: `${theme.spacing(2)}px`,
      marginRight: `${theme.spacing(2)}px`,
    },
  },
  global: {
    zIndex: theme.zIndex.appBar - 2,

    top: 0,
    left: 0,

    "&:before": {
      content: "''",
      display: "flex",
      width: "100%",
      height: 72,
      top: 0,
      background: theme.palette.atmo2,
      opacity: "75%",
    },
  },
  wrapper: {
    height: 52,
    paddingRight: theme.hv.spacing.xs,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  globalWrapperComplement: {
    position: "absolute",
    top: 0,
    left: 0,
    background: theme.hv.palette.atmosphere.atmo1,
    width: "100%",
    padding: theme.hv.spacing.xs,
    marginTop: theme.hv.spacing.xs,
  },
  content: {
    width: "100%",
    padding: theme.hv.spacing.xs,
    display: "flex",
    position: "relative",
    alignItems: "center",
    paddingTop: 17,
    paddingBottom: 17,
  },
  globalSectionArea: {
    background: "none",
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
  },
  backButton: {
    marginRight: theme.hv.spacing.xs,
  },
  name: {
    flexGrow: 1,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: "auto",
    "& > *:not(:first-child) ": {
      marginLeft: theme.hv.spacing.xs,
    },
  },
});

export default styles;
