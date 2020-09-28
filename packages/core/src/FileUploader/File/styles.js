const styles = (theme) => ({
  progressbarBack: {
    position: "absolute",
    top: "-1px",
    width: "100%",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
  },
  progressbar: {
    position: "absolute",
    top: "-1px",
    width: "80%",
    height: 2,
    border: `1px solid ${theme.hv.palette.accent.acce1}`,
    "&::-moz-progress-bar": {
      background: theme.hv.palette.accent.acce1,
    },
  },
  progressTextContainer: {
    display: "flex",
  },
  icon: {
    width: 32,
    height: 32,
    margin: theme.spacing(0, "xs"),
  },
  removeButton: {
    position: "absolute",
    margin: theme.spacing(0, "xs"),
    right: 0,
    top: 20,
  },
  fail: {
    color: theme.palette.sema4,
  },
  nameText: {},
});

export default styles;
