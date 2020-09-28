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
  icon: {
    ...icon,
    cursor: "pointer",
  },
  timePickerContainer: {
    position: "relative",
    minWidth: "200px",
  },
  label: {
    marginBottom: `${theme.hv.spacing.xs}px`,
    display: "block",
  },
  timePopperContainer: {
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    zIndex: "10",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: `${theme.hv.spacing.sm}px`,
    paddingRight: `${theme.hv.spacing.sm}px`,
  },
  popper: {
    minWidth: "100%",
    zIndex: "10",
  },
  popperBelow: {
    marginTop: `${theme.hv.spacing.xs}px`,
    boxShadow: "0 -2px 12px rgba(65,65,65,.12)",
  },
  popperAbove: {
    marginBottom: `${theme.hv.spacing.xs}px`,
    boxShadow: "0 2px 12px rgba(65,65,65,.12)",
  },
  separator: {
    ...theme.hv.typography.sTitle,
    marginLeft: "5px",
    marginRight: "5px",
  },
  periodContainer: {
    marginLeft: `${theme.hv.spacing.xs}px`,
  },
});

export default styles;
