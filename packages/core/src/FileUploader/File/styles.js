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
    flexGrow: 1,
    alignItems: "center",
  },
  previewContainer: {
    display: "flex",
    margin: theme.hvSpacing(0, "xs"),
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",

    "& img": {
      width: "100%",
      height: "100%",
      maxWidth: 52,
      maxHeight: 52,
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  icon: {
    width: 32,
    height: 32,
    margin: theme.hvSpacing(0, "xs"),
  },
  removeButton: {
    margin: theme.hvSpacing(0, "xs"),
  },
  fail: {
    color: theme.palette.sema4,
  },
  nameText: {},
});

export default styles;
