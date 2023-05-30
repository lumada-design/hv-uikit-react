const styles = (theme) => ({
  unitTimeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  unitTimeInput: {
    ...theme.hv.typography.sTitle,
    fontWeight: 600,
    textAlign: "center",
    height: "40px",
    width: "40px",
    padding: 0,
    margin: 0,
    "&::placeholder": {
      fontSize: 16,
      fontWeight: 600,
    },
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      "-moz-appearance": "none",
      margin: 0,
    },
    "&[type=number]": {
      "-webkit-appearance": "textfield",
      "-moz-appearance": "textfield",
    },
  },
  unitTimeInputRoot: {},

  subtractIcon: {
    marginTop: `${theme.hv.spacing.xs}px`,
  },
  inputContainer: {
    minWidth: "40px",
    maxWidth: "40px",
  },
  inputBorderContainer: {
    top: "40px",
  },
});

export default styles;
