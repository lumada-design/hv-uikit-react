const styles = theme => ({
  progressbarBack: {
    position: "absolute",
    top: "-1px",
    width: "100%",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`
  },
  progressbar: {
    position: "absolute",
    top: "-1px",
    width: "80%",
    height: 2,
    border: `1px solid ${theme.hv.palette.accent.acce1}`,
    "&::-moz-progress-bar": {
      background: theme.hv.palette.accent.acce1
    }
  },
  progressTextContainer: {
    display: "flex"
  },
  icon: {
    width: 32,
    height: 32,
    margin: `0 ${theme.hv.spacing.xs}px`
  },
  removeButton: {
    position: "absolute",
    margin: `0 ${theme.hv.spacing.xs}px`,
    right: 0,
    top: 20
  },
  fail: {
    color: theme.hv.palette.semantic.sema4
  },
  nameText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

export default styles;
