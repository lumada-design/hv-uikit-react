const styles = theme => ({
  root: {
    display: "inline-block"
  },
  icon: {
    position: "relative",
    boxSizing: "content-box",
    padding: 0,
    borderRadius: 0
  },
  iconSelected: {
    backgroundColor: theme.palette.atmo1,
    boxShadow: theme.hv.shadows[1],
    "&:hover": {
      backgroundColor: theme.palette.atmo1
    },
    "& svg .color0": {
      fill: theme.palette.acce1
    }
  }
});

export default styles;
