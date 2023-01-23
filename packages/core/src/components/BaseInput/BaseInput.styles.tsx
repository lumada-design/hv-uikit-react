import styled from "@emotion/styled";
import {
  Input as MuiInput,
  inputClasses as MuiInputClasses,
} from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";
import { outlineStyles } from "utils";

export const StyledRoot = styled(
  "div",
  transientOptions
)(
  ({
    $disabled,
    $invalid,
    $resizable,
    $readOnly,
  }: {
    $disabled: boolean;
    $invalid: boolean;
    $resizable: boolean;
    $readOnly: boolean;
  }) => ({
    display: "inline-block",
    width: "100%",
    position: "relative",
    "& .inputRootMultiline": {
      overflow: "auto",
      border: "none",
    },
    "&:hover .inputRootMultiline": {
      "& .input": {
        border: `1px solid ${theme.baseInput.hoverColor}`,
      },
    },
    "&:hover .inputBorderContainer": {
      backgroundColor: theme.baseInput.hoverColor,
    },
    "&:focus-within .inputBorderContainer": {
      backgroundColor: theme.baseInput.hoverColor,
    },

    "@global": {
      "input:-webkit-autofill": {
        "-webkit-box-shadow": `0 0 0px 1000px ${theme.colors.atmo1} inset`,
        "-webkit-text-fill-color": theme.colors.acce1,
      },

      /* clears input's clear and reveal buttons from IE */
      "input[type=search]::-ms-clear": {
        display: "none",
        width: 0,
        height: 0,
      },
      "input[type=search]::-ms-reveal": {
        display: "none",
        width: 0,
        height: 0,
      },

      /* clears input's clear button from Chrome */
      "input[type=search]::-webkit-search-decoration": { display: "none" },
      "input[type=search]::-webkit-search-cancel-button": { display: "none" },
      "input[type=search]::-webkit-search-results-button": {
        display: "none",
      },
      "input[type=search]::-webkit-search-results-decoration": {
        display: "none",
      },
    },
    ...($resizable && {
      width: "auto",
    }),
    ...($readOnly && {
      "& .inputBorderContainer": {
        backgroundColor: "transparent",
      },
      "&:hover .inputBorderContainer": {
        backgroundColor: "transparent",
      },
      "&:focus-within .inputBorderContainer": {
        backgroundColor: "transparent",
      },

      // multiline
      "& .inputRootMultiline": {
        "& .input": {
          border: "1px solid transparent",
        },
      },
      "&:hover .inputRootMultiline": {
        "& .input": {
          border: "1px solid transparent",
        },
      },
      "&:focus-within .inputRootMultiline": {
        "& .input": {
          border: "1px solid transparent",
        },
      },
    }),
    ...($disabled && {
      "& .inputBorderContainer": {
        backgroundColor: theme.colors.atmo4,
      },
      "&:hover .inputBorderContainer": {
        backgroundColor: theme.colors.atmo4,
      },
      "& .inputRootMultiline": {
        "& .input": {
          backgroundColor: theme.colors.atmo3,
          border: `1px solid ${theme.colors.atmo4}`,
        },
      },
      "&:hover .inputRootMultiline": {
        "& .input": {
          backgroundColor: theme.colors.atmo3,
          border: `1px solid ${theme.colors.atmo4}`,
        },
      },
    }),
    ...($invalid && {
      "&:not(.disabled)": {
        "& .inputBorderContainer": {
          backgroundColor: theme.colors.sema4,
        },
        "&:hover .inputBorderContainer": {
          backgroundColor: theme.colors.sema4,
        },
        "& .inputRootMultiline": {
          "& .input": {
            border: `1px solid ${theme.colors.sema4}`,
          },
        },
        "&:hover .inputRootMultiline": {
          "& .input": {
            border: `1px solid ${theme.colors.sema4}`,
          },
        },
        "&:focus-within .inputRootMultiline": {
          "& .input": {
            border: `1px solid ${theme.colors.sema4}`,
          },
        },
      },
    }),
  })
);

export const StyledInputBorderContainer = styled("div")({
  position: "absolute",
  width: "calc(100% - 4px)",
  height: theme.baseInput.underlineHeight,
  top: "31px",
  left: "2px",
  backgroundColor: theme.colors.atmo4,
});

export const StyledInput = styled(
  MuiInput,
  transientOptions
)(
  ({
    $resizable,
    $disabled,
    $readOnly,
  }: {
    $resizable: boolean;
    $disabled: boolean;
    $readOnly: boolean;
  }) => ({
    [`&.${MuiInputClasses.root}`]: {
      margin: 0,
      width: "100%",
      borderRadius: "2px",
      border: `1px solid ${theme.baseInput.borderColor}`,
      backgroundColor: theme.colors.atmo1,
      "&.inputRootInvalid": {
        border: `1px solid ${theme.baseInput.invalidBorderColor}`,
      },
      "&.inputRootReadOnly": {
        border: `1px solid ${theme.baseInput.readOnlyBorderColor}`,
        backgroundColor: theme.baseInput.readOnlyBackgroundColor,
      },
      "&:hover:not(.inputRootDisabled):not(.inputRootInvalid)": {
        borderColor: theme.baseInput.hoverColor,
      },
      "&:hover:not(.inputRootDisabled)::before": {
        borderBottom: "none",
      },
      "&::before": {
        borderBottom: "none",
      },
      "&::after": {
        borderBottom: "none",
      },
      [`& .${MuiInputClasses.input}`]: {
        height: "21px",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: "6px 0 5px",
        color: theme.colors.acce1,
        fontSize: "12px",
        letterSpacing: "0.02em",
        lineHeight: "16px",
        fontWeight: 400,
        overflow: "hidden",
        textOverflow: "ellipsis",
        outline: "none",
        "&.inputReadOnly": {
          color: "yellow",
        },
        "&::placeholder": {
          color: theme.baseInput.placeholderColor,
          fontSize: "12px",
          letterSpacing: "0.02em",
          lineHeight: "16px",
          fontWeight: 400,
          opacity: 1,
        },
        "&::-ms-clear": {
          display: "none",
        },
        width: "initial",
        flexGrow: 1,
        ...($resizable && {
          resize: "both",
          width: "100%",
        }),
        ...($disabled && {
          color: theme.baseInput.disabledTextColor,
        }),
        ...($readOnly && {
          color: theme.baseInput.readOnlyTextColor,
        }),
      },
    },
    [`&.${MuiInputClasses.focused}`]: {
      background: theme.colors.atmo1,
      ...outlineStyles,
      "&:hover": {
        background: theme.colors.atmo1,
      },
      "&.inputRootReadOnly": {
        backgroundColor: theme.baseInput.readOnlyBackgroundColor,
      },
    },
    [`&.${MuiInputClasses.disabled}`]: {
      background: theme.baseInput.disabledBackgroundColor,
      borderColor: theme.baseInput.disabledBorderColor,
      "&:hover": {
        background: theme.colors.atmo3,
        cursor: "not-allowed",
      },
      cursor: "not-allowed",
      "&&::before": {
        borderBottomStyle: "none",
      },
    },
    [`&.${MuiInputClasses.multiline}`]: {
      padding: 0,
      backgroundColor: "transparent",
      "& input": {
        border: `1px solid ${theme.colors.atmo4}`,
        borderRadius: "2px",
        backgroundColor: theme.colors.atmo1,
        height: "auto",
        minHeight: "21px",
        padding: "5px 10px",
        overflow: "auto",
        marginLeft: "0px",
        marginRight: "0px",
      },
    },
  })
);
