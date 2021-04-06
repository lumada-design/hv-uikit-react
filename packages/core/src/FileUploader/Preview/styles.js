const styles = (theme) => ({
  previewButton: {
    width: 52,
    height: 52,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    display: "none",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    opacity: 0.75,

    "$previewButton:hover &": {
      display: "flex",
    },
  },
});

export default styles;
