const styles = (theme) => ({
  root: {
    position: "relative",
    "& $list": {
      backgroundColor: theme.palette.atmo1,
      boxShadow: theme.hv.shadows[1],
      padding: theme.spacing("sm"),
    },
  },
  popper: {
    width: "100%",
    position: "absolute",
    transform: "translate3d(0, -1px, 0) !important",
    zIndex: theme.zIndex.tooltip,
  },
  list: {},
});

export default styles;
