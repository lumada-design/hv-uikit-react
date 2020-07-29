import { outlineStyles } from "../../Focus/styles";

const styles = theme => ({
  root: {
    position: "relative"
  },
  inputRoot: {
    margin: 0,
    width: "100%",
    borderStyle: "solid",
    borderRadius: "2px",
    borderWidth: " 0 0 1px 0",
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    borderColor: theme.hv.palette.atmosphere.atmo4,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: " 0 0 1px 0",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo1
    }
  },
  inputRootDisabled: {
    borderColor: theme.hv.palette.atmosphere.atmo4,
    background: theme.hv.palette.atmosphere.atmo3,
    "&:hover": {
      borderColor: theme.hv.palette.atmosphere.atmo4,
      background: theme.hv.palette.atmosphere.atmo3,
      cursor: "not-allowed"
    },
    cursor: "not-allowed"
  },
  inputRootFocused: {
    borderStyle: "solid",
    borderWidth: " 0 0 1px 0",
    borderColor: theme.hv.palette.accent.acce1,
    background: theme.hv.palette.atmosphere.atmo1,
    ...outlineStyles,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: "0 0 1px 0",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo1
    }
  },
  inputRootInvalid: {
    borderColor: theme.hv.palette.semantic.sema4,
    "&:hover": {
      borderColor: theme.hv.palette.semantic.sema4
    }
  },
  input: {
    height: `20px`,
    marginLeft: theme.hv.spacing.xs,
    marginRight: theme.hv.spacing.xs,
    padding: "6px 0 5px",
    ...theme.hv.typography.normalText,
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&::placeholder": {
      ...theme.hv.typography.placeholderText,
      opacity: 1
    },
    "&::-ms-clear": {
      display: "none"
    }
  },
  inputLowerBorder: {
    width: "100%",
    heigth: "1px",
    backgroundColor: "red",
    position: "absolute"
  },
  inputDisabled: {
    cursor: "not-allowed"
  },
  multiLine: {
    padding: 0
  },
  "@global": {
    "input:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0px 1000px ${theme.hv.palette.atmosphere.atmo1} inset`,
      "-webkit-text-fill-color": theme.hv.typography.normalText.color
    }
  }
});

export default styles;
