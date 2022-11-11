const styles = (theme) => ({
  refContainer: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
  },
  contentContainer: {
    position: "relative",
    padding: 20,
    marginLeft: 0,
    minHeight: 400,
    overflowX: "hidden",
  },
  fixedHeight: {
    minHeight: "calc(100vh - 387px)",
  },
  summarySticky: {
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  summaryContainer: {
    position: "absolute",
    top: 0,
    minWidth: 280,
    boxShadow: theme.hv.shadows[1],
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    transition: "transform 0.3s",
    transitionTimingFunction: "ease-in-out",
    overflowY: "scroll",
  },
});

export default styles;
