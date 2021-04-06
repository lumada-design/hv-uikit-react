const styles = (theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    "&:before": {
      content: "''",
      width: "100%",
      height: 72,
      top: 0,
      display: "flex",
      background: theme.palette.atmo2,
      opacity: "75%",
    },
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
  },
  wrapper: {
    top: 0,
    left: 0,
    width: "100%",
    position: "absolute",
    height: 52,
    background: theme.hv.palette.atmosphere.atmo1,
    marginTop: theme.hv.spacing.xs,
    padding: theme.hvSpacing("xs", "xs", "xs", 0),
    display: "flex",
    justifyContent: "space-between",
  },
  globalWrapperComplement: {
    width: "100%",
    padding: theme.hv.spacing.xs,
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
    display: "flex",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& > *:not(:first-child) ": {
      marginLeft: theme.hv.spacing.sm,
    },
  },
});

export default styles;
