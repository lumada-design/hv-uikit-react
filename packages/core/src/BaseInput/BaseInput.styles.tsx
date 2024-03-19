import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";
import { createClasses } from "../utils/classes";

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
      backgroundColor: theme.colors.atmo2,
      borderColor: theme.colors.secondary_60,
    },

    "& $inputBorderContainer": {
      backgroundColor: theme.colors.atmo4,
    },

    "&:hover $inputBorderContainer": {
      backgroundColor: theme.colors.atmo4,
    },

    "&& $input": {
      color: theme.colors.secondary_60,
      WebkitTextFillColor: theme.colors.secondary_60,
    },

    "& $inputRootMultiline": {
      "& $input": {
        backgroundColor: theme.colors.atmo2,
        border: `1px solid ${theme.colors.secondary_60}`,
      },
    },

    "&:hover $inputRootMultiline": {
      "& $input": {
        backgroundColor: theme.colors.atmo2,
        border: `1px solid ${theme.colors.secondary_60}`,
      },
    },
  },
  invalid: {
    "&:not(.disabled)": {
      "& $inputBorderContainer": {
        backgroundColor: theme.colors.negative,
      },

      "&:hover $inputBorderContainer": {
        backgroundColor: theme.colors.negative,
      },

      "& $inputRootMultiline": {
        "& $input": {
          border: `1px solid ${theme.colors.negative}`,
        },
      },

      "&:hover $inputRootMultiline": {
        "& $input": {
          border: `1px solid ${theme.colors.negative}`,
        },
      },

      "&:focus-within $inputRootMultiline": {
        "& $input": {
          border: `1px solid ${theme.colors.negative}`,
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
        border: `1px solid ${theme.colors.secondary_60}`,
        backgroundColor: theme.colors.atmo2,
      },
    },

    "&:hover $inputRootMultiline": {
      "& $input": {
        border: `1px solid ${theme.colors.secondary_60}`,
        backgroundColor: theme.colors.atmo2,
      },
    },

    "&:focus-within $inputRootMultiline": {
      "& $input": {
        border: `1px solid ${theme.colors.secondary_60}`,
        backgroundColor: theme.colors.atmo2,
      },
    },
  },
  inputBorderContainer: {
    position: "absolute",
    width: "calc(100% - 4px)",
    height: "0px",
    top: "31px",
    left: "2px",
    backgroundColor: theme.colors.atmo4,
  },
  inputRootInvalid: { borderColor: theme.colors.negative },
  inputRootReadOnly: {
    borderColor: theme.colors.secondary_60,
    backgroundColor: theme.colors.atmo2,
  },
  inputRoot: {
    margin: 0,
    width: "100%",
    borderRadius: theme.radii.base,
    height: "32px",
    border: `1px solid ${theme.colors.secondary}`,
    boxSizing: "border-box",
    backgroundColor: theme.colors.atmo1,
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
    backgroundColor: theme.colors.atmo1,
    ...outlineStyles,

    "&:hover": {
      backgroundColor: theme.colors.atmo1,
    },

    "&$inputRootReadOnly": {
      backgroundColor: theme.colors.atmo2,
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
      border: `1px solid ${theme.colors.secondary}`,
      borderRadius: theme.radii.base,
      backgroundColor: theme.colors.atmo1,
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
      color: theme.colors.secondary_80,
    },

    "&::-ms-clear": {
      display: "none",
    },
  },
  inputDisabled: {},
  inputReadOnly: {
    color: theme.colors.secondary_80,
  },
  inputResizable: { resize: "both", width: "100%" },
});
