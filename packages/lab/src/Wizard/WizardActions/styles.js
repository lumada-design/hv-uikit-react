const styles = () => ({
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonWidth: {
    width: 120,
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
