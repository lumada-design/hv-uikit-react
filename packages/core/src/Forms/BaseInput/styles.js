import { outlineStyles } from "../../Focus/styles";

const styles = theme => ({
  root: {
    position: "relative",
    "&:hover $inputLowerBorder": {
      backgroundColor: theme.hv.palette.accent.acce1
    }
  },
  disabledRoot: {
    "& $inputLowerBorder": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      borderLeft: `4px solid ${theme.hv.palette.atmosphere.atmo3}`,
      borderRight: `4px solid ${theme.hv.palette.atmosphere.atmo3}`
    },
    "&:hover $inputLowerBorder": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      borderLeft: `4px solid ${theme.hv.palette.atmosphere.atmo3}`,
      borderRight: `4px solid ${theme.hv.palette.atmosphere.atmo3}`
    }
  },
  invalidRoot: {
    "& $inputLowerBorder": {
      backgroundColor: theme.hv.palette.semantic.sema4
    },
    "&:hover $inputLowerBorder": {
      backgroundColor: theme.hv.palette.semantic.sema4
    }
  },
  inputRoot: {
    margin: 0,
    width: "100%",
    borderRadius: "2px",
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  inputRootDisabled: {
    background: theme.hv.palette.atmosphere.atmo3,
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo3,
      cursor: "not-allowed"
    },
    cursor: "not-allowed"
  },
  inputRootFocused: {
    background: theme.hv.palette.atmosphere.atmo1,
    ...outlineStyles,
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo1
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
  inputBorderContainer: {
    position: "absolute",
    width: "100%",
    height: "1px",
    top: "31px",
    left: "0px"
  },
  inputLowerBorder: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
    borderLeft: `4px solid ${theme.hv.palette.atmosphere.atmo1}`,
    borderRight: `4px solid ${theme.hv.palette.atmosphere.atmo1}`
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
