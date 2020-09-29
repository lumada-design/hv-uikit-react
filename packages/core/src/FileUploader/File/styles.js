const styles = (theme) => ({
  progressbarBack: {
    position: "absolute",
    top: "-1px",
    width: "100%",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
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
    justifyContent: "space-between",
    marginLeft: "auto",
  },
  icon: {
    width: 32,
    height: 32,
  },
  removeButton: {
    marginLeft: `${theme.hv.spacing.sm}px`,
    padding: 0,
    minWidth: "unset",
  },
  fail: {
    color: theme.hv.palette.semantic.sema4,
  },
  nameText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export default styles;
