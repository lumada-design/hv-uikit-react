const styles = () => ({
  buttonWidth: {
    width: 120,
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    "& > button:last-child": {
      marginLeft: 20,
    },
  },
  buttonSpacing: {
    paddingLeft: 28,
  },
});

export default styles;
