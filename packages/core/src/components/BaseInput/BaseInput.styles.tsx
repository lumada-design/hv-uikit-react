import { CSSProperties } from "react";

import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvBaseInput", {
  root: {
    display: "inline-block",
    width: "100%",
    position: "relative",

    "&:hover $inputBorderContainer": {
      backgroundColor: theme.baseInput.hoverColor,
    },

    "&:focus-within $inputBorderContainer": {
      backgroundColor: theme.baseInput.hoverColor,
    },
  },
  disabled: {
    "& $inputBorderContainer": {
      backgroundColor: theme.colors.atmo4,
    },

    "&:hover $inputBorderContainer": {
      backgroundColor: theme.colors.atmo4,
    },

    "& $inputRootMultiline": {
      "& $input": {
        backgroundColor: theme.baseInput.disabledBackgroundColor,
        border: `1px solid ${theme.baseInput.multilineDisabledBorderColor}`,
      },
    },

    "&:hover $inputRootMultiline": {
      "& $input": {
        backgroundColor: theme.baseInput.disabledBackgroundColor,
        border: `1px solid ${theme.baseInput.multilineDisabledBorderColor}`,
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
        border: `1px solid ${theme.baseInput.readOnlyBorderColor}`,
        backgroundColor: theme.baseInput.readOnlyBackgroundColor,
      },
    },

    "&:hover $inputRootMultiline": {
      "& $input": {
        border: `1px solid ${theme.baseInput.readOnlyBorderColor}`,
        backgroundColor: theme.baseInput.readOnlyBackgroundColor,
      },
    },

    "&:focus-within $inputRootMultiline": {
      "& $input": {
        border: `1px solid ${theme.baseInput.readOnlyBorderColor}`,
        backgroundColor: theme.baseInput.readOnlyBackgroundColor,
      },
    },
  },
  inputBorderContainer: {
    position: "absolute",
    width: "calc(100% - 4px)",
    height: theme.baseInput.underlineHeight,
    top: "31px",
    left: "2px",
    backgroundColor: theme.colors.atmo4,
  },
  inputRootInvalid: { borderColor: theme.colors.negative },
  inputRootReadOnly: {
    borderColor: theme.baseInput.readOnlyBorderColor,
    backgroundColor: theme.baseInput.readOnlyBackgroundColor,
  },
  inputRoot: {
    margin: 0,
    width: "100%",
    borderRadius: theme.radii.base,
    height: "32px",
    border: `1px solid ${theme.baseInput.borderColor}`,
    boxSizing: "border-box",
    backgroundColor: theme.colors.atmo1,
    fontFamily: theme.fontFamily.body,

    "&:hover:not($inputRootDisabled):not($inputRootInvalid):not($inputRootReadOnly)":
      {
        borderColor: theme.baseInput.hoverColor,
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
    background: theme.colors.atmo1,
    ...outlineStyles,

    "&:hover": {
      background: theme.colors.atmo1,
    },

    "& $inputRootReadOnly": {
      backgroundColor: theme.baseInput.readOnlyBackgroundColor,
    },
  },
  inputRootDisabled: {
    background: theme.baseInput.disabledBackgroundColor,
    borderColor: theme.baseInput.disabledBorderColor,
    cursor: "not-allowed",

    "&:hover": {
      background: theme.baseInput.disabledBackgroundColor,
      cursor: "not-allowed",
    },

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
      border: `1px solid ${theme.baseInput.multilineBorderColor}`,
      borderRadius: theme.radii.base,
      backgroundColor: theme.colors.atmo1,
      height: "auto",
      minHeight: "21px",
      padding: "5px 10px",
      overflow: "auto",
      marginLeft: "0px",
      marginRight: "0px",

      "&:hover": {
        border: `1px solid ${theme.baseInput.hoverColor}`,
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
    ...(theme.typography.body as CSSProperties),

    "&::placeholder": {
      opacity: 1,
      color: theme.baseInput.placeholderColor,
    },

    "&::-ms-clear": {
      display: "none",
    },
  },
  inputDisabled: {
    color: theme.baseInput.disabledTextColor,
  },
  inputReadOnly: {
    color: theme.baseInput.readOnlyTextColor,
  },
  inputResizable: { resize: "both", width: "100%" },
});
