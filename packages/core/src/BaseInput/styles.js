import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {
    display: "inline-block",
    width: "100%",
    position: "relative",
    "& $inputRootMultiline": {
      overflow: "auto",
      border: "none",
    },
    "&:hover $inputRootMultiline": {
      "& $input": {
        border: `1px solid ${theme.hv.palette.accent.acce1}`,
      },
    },
    "&:hover $inputBorderContainer": {
      backgroundColor: theme.hv.palette.accent.acce1,
    },
    "&:focus-within $inputBorderContainer": {
      backgroundColor: theme.hv.palette.accent.acce1,
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within $inputBorderContainer": {
      backgroundColor: theme.hv.palette.accent.acce1,
    },
    "&:focus-within $inputRootMultiline": {
      "& $input": {
        border: `1px solid ${theme.hv.palette.accent.acce1}`,
      },
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within $inputRootMultiline": {
      "& $input": {
        border: `1px solid ${theme.hv.palette.accent.acce1}`,
      },
    },
  },
  resizable: {
    width: "auto",
  },
  readOnly: {
    "& $inputBorderContainer": {
      backgroundColor: "transparent",
    },
    "&:hover $inputBorderContainer": {
      backgroundColor: "transparent",
    },
    "&:focus-within $inputBorderContainer": {
      backgroundColor: "transparent",
    },

    // multiline
    "& $inputRootMultiline": {
      "& $input": {
        border: "1px solid transparent",
      },
    },
    "&:hover $inputRootMultiline": {
      "& $input": {
        border: "1px solid transparent",
      },
    },
    "&:focus-within $inputRootMultiline": {
      "& $input": {
        border: "1px solid transparent",
      },
    },
  },
  disabled: {
    "& $inputBorderContainer": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
    },
    "&:hover $inputBorderContainer": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
    },
    "& $inputRootMultiline": {
      "& $input": {
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
      },
    },
    "&:hover $inputRootMultiline": {
      "& $input": {
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
      },
    },
  },
  invalid: {
    "&:not($disabled)": {
      "& $inputBorderContainer": {
        backgroundColor: theme.hv.palette.semantic.sema4,
      },
      "&:hover $inputBorderContainer": {
        backgroundColor: theme.hv.palette.semantic.sema4,
      },
      "& $inputRootMultiline": {
        "& $input": {
          border: `1px solid ${theme.hv.palette.semantic.sema4}`,
        },
      },
      "&:hover $inputRootMultiline": {
        "& $input": {
          border: `1px solid ${theme.hv.palette.semantic.sema4}`,
        },
      },
      "&:focus-within $inputRootMultiline": {
        "& $input": {
          border: `1px solid ${theme.hv.palette.semantic.sema4}`,
        },
      },
      // IE fallback code (using focus-within-polyfill)
      "&.focus-within $inputRootMultiline": {
        "& $input": {
          border: `1px solid ${theme.hv.palette.semantic.sema4}`,
        },
      },
    },
  },

  inputRoot: {
    margin: 0,
    width: "100%",
    borderRadius: "2px",
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
  },
  inputRootFocused: {
    background: theme.hv.palette.atmosphere.atmo1,
    ...outlineStyles,
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo1,
    },
  },
  inputRootDisabled: {
    background: theme.hv.palette.atmosphere.atmo3,
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo3,
      cursor: "not-allowed",
    },
    cursor: "not-allowed",
  },
  inputRootMultiline: {
    padding: 0,
    backgroundColor: "transparent",
    "& $input": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
      borderRadius: "2px",
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      height: "auto",
      minHeight: "21px",
      padding: "5px 10px",
      overflow: "auto",
      marginLeft: "0px",
      marginRight: "0px",
    },
  },

  input: {
    height: "21px",
    marginLeft: theme.hv.spacing.xs,
    marginRight: theme.hv.spacing.xs,
    padding: "6px 0 5px",
    ...theme.hv.typography.normalText,
    overflow: "hidden",
    textOverflow: "ellipsis",
    outline: "none",
    "&::placeholder": {
      ...theme.hv.typography.placeholderText,
      opacity: 1,
    },
    "&::-ms-clear": {
      display: "none",
    },
    width: "auto",
    flexGrow: 1,
  },
  inputResizable: {
    resize: "both",
    width: "100%",
  },

  inputBorderContainer: {
    position: "absolute",
    width: "calc(100% - 4px)",
    height: "1px",
    top: "31px",
    left: "2px",
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
  },

  "@global": {
    "input:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0px 1000px ${theme.hv.palette.atmosphere.atmo1} inset`,
      "-webkit-text-fill-color": theme.hv.typography.normalText.color,
    },
  },
});

export default styles;
