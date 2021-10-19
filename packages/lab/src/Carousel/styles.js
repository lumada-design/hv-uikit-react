const styles = () => ({
  root: {},
  step: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    background: "none",
    paddingTop: 10,
    maxHeight: 250,
  },
  stepperCount: {
    "&::first-letter": {
      fontWeight: 600,
    },
  },
});

export default styles;
