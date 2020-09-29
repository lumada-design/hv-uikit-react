import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {
    display: "inline-block",
    width: "100%",
  },
  rootResizable: {
    width: "auto",
  },
  input: {
    height: "auto",
    padding: "5px 10px",
    overflow: "auto",
    marginLeft: "0px",
    marginRight: "0px",
    minHeight: "21px",
    minWidth: "150px",
    maxWidth: "610px",
  },
  resize: {
    resize: "auto",
    width: "100%",
  },
  defaultWith: {
    width: "610px",
  },
  inputRoot: {
    borderWidth: "1px",
    "&:hover": {
      borderWidth: "1px",
    },
  },
  inputRootDisabled: {
    background: theme.hv.palette.atmosphere.atmo2,
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo2,
    },
  },
  inputRootFocused: {
    borderWidth: "1px",
    ...outlineStyles,
    "&:hover": {
      borderWidth: "1px",
    },
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  container: {},
  characterCounter: {
    textAlign: "right",
    paddingTop: theme.hv.spacing.xs,
  },
  disabled: {
    ...theme.hv.typography.normalText,
  },
  invalid: {
    color: theme.hv.palette.accent.acce3,
  },
});

export default styles;
