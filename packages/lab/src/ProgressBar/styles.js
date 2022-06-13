const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  progress: {
    width: "100%",
  },

  progressContainer: {
    width: "100%",
  },

  progressBarContainer: {
    display: "flex",
    width: "100%",
    height: 4,
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
  },

  progressBar: {
    backgroundColor: "#000",
    height: 4,
  },

  progressDone: {
    backgroundColor: theme.hv.palette.semantic.sema1,
  },

  progressError: {
    backgroundColor: theme.hv.palette.semantic.sema4,
  },

  progressBarLabel: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "end",
  },
});

export default styles;
