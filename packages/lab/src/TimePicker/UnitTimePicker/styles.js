const icon = {
  width: "32px",
  height: "32px",
  cursor: "pointer"
};

const styles = theme => ({
  unitTimeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  unitTimeInput: {
    ...theme.hv.typography.sTitle,
    fontWeight: 600,
    textAlign: "center",
    height: "40px",
    width: "40px",
    padding: 0,
    margin: 0,
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      "-moz-appearance": "none",
      margin: 0
    },
    "&[type=number]": {
      "-webkit-appearance": "textfield",
      "-moz-appearance": "textfield"
    }
  },
  unitTimeInputRoot: {},
  unitTimeInputRootInvalid: {
    border: "1px red solid"
  },
  addIcon: {
    ...icon,
    marginTop: `${theme.hv.spacing.sm}px`
  },
  subtractIcon: {
    ...icon,
    marginBottom: `${theme.hv.spacing.sm}px`
  },
  inputContainer: {
    minWidth: "40px",
    maxWidth: "40px"
  }
});

export default styles;
