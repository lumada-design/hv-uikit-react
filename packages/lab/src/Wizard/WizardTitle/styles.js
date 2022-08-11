const styles = (theme) => ({
  messageContainer: {
    "& > div": {
      width: "100%",
    },
  },
  titleContainer: {
    margin: 0,
    width: "100%",
  },
  buttonWidth: {
    width: 120,
  },
  rootSummaryButton: {
    paddingRight: 18,
  },
  headerContainer: {
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    "& h6": {
      fontSize: "16px",
      fontWeight: "bold",
      letterSpacing: 0,
    },
  },
  stepContainer: {
    margin: "auto",
  },
});

export default styles;
