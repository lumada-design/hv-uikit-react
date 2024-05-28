import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvBaseInput", {
  root: {
    display: "inline-block",
    width: "100%",
    position: "relative",

    "&:hover $inputBorderContainer": {
      backgroundColor: theme.colors.primary,
    },

    "&:focus-within $inputBorderContainer": {
      backgroundColor: theme.colors.primary,
    },
  },
  disabled: {
    "& $inputRoot": {
      backgroundColor: theme.colors.bgPage,
      borderColor: theme.colors.textDisabled,
    },

    "& $inputBorderContainer": {
      backgroundColor: theme.colors.divider,
    },

    "&:hover $inputBorderContainer": {
      backgroundColor: theme.colors.divider,
    },

    "&& $input": {
      color: theme.colors.textDisabled,
      WebkitTextFillColor: theme.colors.textDisabled,
    },

    "& $inputRootMultiline": {
      "& $input": {
        backgroundColor: theme.colors.bgPage,
        border: `1px solid ${theme.colors.textDisabled}`,
      },
    },

    "&:hover $inputRootMultiline": {
      "& $input": {
        backgroundColor: theme.colors.bgPage,
        border: `1px solid ${theme.colors.textDisabled}`,
      },
    },
  },
  invalid: {
    "&:not(.disabled)": {
      "& $inputBorderContainer": {
        backgroundColor: theme.colors.error,
      },

      "&:hover $inputBorderContainer": {
        backgroundColor: theme.colors.error,
      },

      "& $inputRootMultiline": {
        "& $input": {
          border: `1px solid ${theme.colors.error}`,
        },
      },

      "&:hover $inputRootMultiline": {
        "& $input": {
          border: `1px solid ${theme.colors.error}`,
        },
      },

      "&:focus-within $inputRootMultiline": {
        "& $input": {
          border: `1px solid ${theme.colors.error}`,
        },
      },
    },
  },
  resizable: { width: "auto" },
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

    "& $inputRootMultiline": {
      "& $input": {
        border: `1px solid ${theme.colors.textDisabled}`,
        backgroundColor: theme.colors.bgPage,
      },
    },

    "&:hover $inputRootMultiline": {
      "& $input": {
        border: `1px solid ${theme.colors.textDisabled}`,
        backgroundColor: theme.colors.bgPage,
      },
    },

    "&:focus-within $inputRootMultiline": {
      "& $input": {
        border: `1px solid ${theme.colors.textDisabled}`,
        backgroundColor: theme.colors.bgPage,
      },
    },
  },
  inputBorderContainer: {
    position: "absolute",
    width: "calc(100% - 4px)",
    height: "0px",
    top: "31px",
    left: "2px",
    backgroundColor: theme.colors.divider,
  },
  inputRootInvalid: { borderColor: theme.colors.error },
  inputRootReadOnly: {
    borderColor: theme.colors.textDisabled,
    backgroundColor: theme.colors.bgPage,
  },
  inputRoot: {
    margin: 0,
    width: "100%",
    borderRadius: theme.radii.base,
    height: "32px",
    border: `1px solid ${theme.colors.text}`,
    boxSizing: "border-box",
    backgroundColor: theme.colors.bgSurface,
    fontFamily: theme.fontFamily.body,

    "&:hover:not($inputRootDisabled):not($inputRootInvalid):not($inputRootReadOnly)":
      {
        borderColor: theme.colors.primary,
      },

    "&:hover:not($inputRootDisabled)::before": {
      borderBottom: "none",
    },

    "&::before": {
      borderBottom: "none",
    },

    "&::after": {
      borderBottom: "none",
    },
  },
  inputRootFocused: {
    backgroundColor: theme.colors.bgSurface,
    ...outlineStyles,

    "&:hover": {
      backgroundColor: theme.colors.bgSurface,
    },

    "&$inputRootReadOnly": {
      backgroundColor: theme.colors.bgPage,
    },
  },
  inputRootDisabled: {
    cursor: "not-allowed",

    "&&::before": {
      borderBottomStyle: "none",
    },
  },
  inputRootMultiline: {
    padding: 0,
    backgroundColor: "transparent",
    overflow: "auto",
    border: "none",
    height: "auto",

    "& $input": {
      border: `1px solid ${theme.colors.text}`,
      borderRadius: theme.radii.base,
      backgroundColor: theme.colors.bgSurface,
      height: "auto",
      minHeight: "21px",
      padding: "5px 10px",
      overflow: "auto",
      marginLeft: "0px",
      marginRight: "0px",

      "&:hover": {
        border: `1px solid ${theme.colors.primary}`,
      },
    },
  },
  input: {
    height: "19px",
    marginLeft: theme.space.xs,
    marginRight: theme.space.xs,
    padding: "6px 0 5px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    outline: "none",
    width: "initial",
    flexGrow: 1,
    ...(theme.typography.body as React.CSSProperties),

    "&::placeholder": {
      opacity: 1,
      color: theme.colors.textSubtle,
    },

    "&::-ms-clear": {
      display: "none",
    },
  },
  inputDisabled: {},
  inputReadOnly: {
    color: theme.colors.textSubtle,
  },
  inputResizable: { resize: "both", width: "100%" },
});
