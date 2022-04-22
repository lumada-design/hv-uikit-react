const icon = {
  position: "absolute",
  right: 0,
  bottom: 0,
  width: "30px",
  height: "30px",
};

const styles = (theme) => ({
  input: {
    border: "none",
    height: "30px",
    width: "100%",
    background: "white",
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      ...theme.hv.typography.placeholderText,
    },
  },
  inputPopperOpenedBelow: {
    boxShadow: "0 10px 12px #fff",
  },
  inputPopperOpenedAbove: {
    boxShadow: "0 -10px 12px #fff",
  },
  inputPopperClosed: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
  },
  inputContainer: {
    position: "relative",
    background: theme.hv.palette.atmosphere.atmo1,
    height: "32px",
    paddingLeft: `${theme.hv.spacing.xs}px`,
    paddingRight: `${theme.hv.spacing.md}px`,
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  icon: {
    ...icon,
    cursor: "pointer",
  },
  timePickerContainer: {
    position: "relative",
    minWidth: "175px",
  },
  label: {
    marginBottom: 6,
    display: "block",
  },
  timePopperContainer: {
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    zIndex: "10",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: `${theme.hv.spacing.sm}px`,
    userSelect: "none",
    minWidth: "175px",
  },
  separator: {
    ...theme.hv.typography.sTitle,
    width: 8,
    position: "relative",
    top: -8,
    paddingLeft: 2,
  },

  formElementRoot: {
    position: "relative",
  },

  iconBaseRoot: {
    position: "absolute",
    top: "-1px",
    right: "-1px",
  },

  dropdownInputRootFocused: {
    boxShadow: "none",
  },
  dropdownPlaceholder: {
    color: theme.hv.palette.accent.acce1,
  },
  dropdownPlaceholderDisabled: {
    color: theme.hv.palette.atmosphere.atmo5,
  },
  dropdownHeaderInvalid: {
    border: `1px solid ${theme.hv.palette.semantic.sema4}`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.semantic.sema4}`,
    },
  },

  dropdownHeaderOpen: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
    },
  },
});

export default styles;
