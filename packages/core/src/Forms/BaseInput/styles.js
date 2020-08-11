import "focus-within-polyfill";
import { outlineStyles } from "../../Focus/styles";

const styles = theme => ({
  root: {
    position: "relative",
    "&:hover $inputBorderContainer": {
      backgroundColor: theme.hv.palette.accent.acce1
    },
    "&:focus-within $inputBorderContainer": {
      backgroundColor: theme.hv.palette.accent.acce1
    }
  },
  disabledRoot: {
    "& $inputBorderContainer": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    },
    "&:hover $inputBorderContainer": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    }
  },
  invalidRoot: {
    "& $inputBorderContainer": {
      backgroundColor: theme.hv.palette.semantic.sema4
    },
    "&:hover $inputBorderContainer": {
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
    height: "21px",
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
    width: "calc(100% - 4px)",
    height: "1px",
    top: "31px",
    left: "2px",
    backgroundColor: theme.hv.palette.atmosphere.atmo4
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
