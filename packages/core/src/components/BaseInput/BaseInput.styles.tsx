import styled from "@emotion/styled";
import {
  Input as MuiInput,
  inputClasses as MuiInputClasses,
} from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";
import { outlineStyles } from "utils";
import baseInputClasses from "./baseInputClasses";
import { CSSProperties } from "react";

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

    [`&:hover .${baseInputClasses.inputBorderContainer}`]: {
      backgroundColor: theme.baseInput.hoverColor,
    },

    [`&:focus-within .${baseInputClasses.inputBorderContainer}`]: {
      backgroundColor: theme.baseInput.hoverColor,
    },

    "@global": {
      "input:-webkit-autofill": {
        "-webkit-box-shadow": `0 0 0px 1000px ${theme.colors.atmo1} inset`,
        "-webkit-text-fill-color": theme.colors.acce1,
      },

      /* Clears input's clear and reveal buttons from IE */
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

      /* Clears input's clear button from Chrome */
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
      [`& .${baseInputClasses.inputBorderContainer}`]: {
        backgroundColor: "transparent",
      },

      [`&:hover .${baseInputClasses.inputBorderContainer}`]: {
        backgroundColor: "transparent",
      },

      [`&:focus-within .${baseInputClasses.inputBorderContainer}`]: {
        backgroundColor: "transparent",
      },
    }),

    ...($disabled && {
      [`& .${baseInputClasses.inputBorderContainer}`]: {
        backgroundColor: theme.colors.atmo4,
      },

      [`&:hover .${baseInputClasses.inputBorderContainer}`]: {
        backgroundColor: theme.colors.atmo4,
      },
    }),

    ...($invalid && {
      "&:not(.disabled)": {
        [`& .${baseInputClasses.inputBorderContainer}`]: {
          backgroundColor: theme.colors.sema4,
        },

        [`&:hover .${baseInputClasses.inputBorderContainer}`]: {
          backgroundColor: theme.colors.sema4,
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
    $invalid,
  }: {
    $resizable: boolean;
    $disabled: boolean;
    $readOnly: boolean;
    $invalid: boolean;
  }) => ({
    [`&.${MuiInputClasses.root}`]: {
      margin: 0,
      width: "100%",
      borderRadius: "2px",
      border: `1px solid ${theme.baseInput.borderColor}`,
      backgroundColor: theme.colors.atmo1,

      ...($invalid && {
        borderColor: theme.colors.sema4,
      }),

      ...($readOnly && {
        borderColor: theme.baseInput.readOnlyBorderColor,
        backgroundColor: theme.baseInput.readOnlyBackgroundColor,
      }),

      [`&:hover:not(.${baseInputClasses.inputRootDisabled}):not(.${baseInputClasses.inputRootInvalid}):not(.${baseInputClasses.inputRootReadOnly})`]:
        {
          borderColor: theme.baseInput.hoverColor,
        },

      [`&:hover:not(.${baseInputClasses.inputRootDisabled})::before`]: {
        borderBottom: "none",
      },

      "&::before": {
        borderBottom: "none",
      },

      "&::after": {
        borderBottom: "none",
      },
    },

    [`& .${MuiInputClasses.input}`]: {
      height: "21px",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
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

    [`&.${MuiInputClasses.focused}`]: {
      background: theme.colors.atmo1,
      ...outlineStyles,

      "&:hover": {
        background: theme.colors.atmo1,
      },

      [`&.${baseInputClasses.inputRootReadOnly}`]: {
        backgroundColor: theme.baseInput.readOnlyBackgroundColor,
      },
    },

    [`&.${MuiInputClasses.disabled}`]: {
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

    [`&.${MuiInputClasses.multiline}`]: {
      padding: 0,
      backgroundColor: "transparent",
      overflow: "auto",
      border: "none",

      [`& .${baseInputClasses.input}`]: {
        border: `1px solid ${theme.baseInput.multilineBorderColor}`,
        borderRadius: "2px",
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

        ...($disabled && {
          backgroundColor: theme.baseInput.disabledBackgroundColor,
          border: `1px solid ${theme.baseInput.multilineDisabledBorderColor}`,

          ":hover": {
            backgroundColor: theme.baseInput.disabledBackgroundColor,
            border: `1px solid ${theme.baseInput.multilineDisabledBorderColor}`,
          },
        }),

        ...($readOnly && {
          border: `1px solid ${theme.baseInput.readOnlyBorderColor}`,
          backgroundColor: theme.baseInput.readOnlyBackgroundColor,

          "&:hover": {
            border: `1px solid ${theme.baseInput.readOnlyBorderColor}`,
            backgroundColor: theme.baseInput.readOnlyBackgroundColor,
          },

          "&:focus-within": {
            border: `1px solid ${theme.baseInput.readOnlyBorderColor}`,
            backgroundColor: theme.baseInput.readOnlyBackgroundColor,
          },
        }),

        ...($invalid && {
          border: `1px solid ${theme.colors.sema4}`,

          "&:hover": {
            border: `1px solid ${theme.colors.sema4}`,
          },

          "&:focus-within": {
            border: `1px solid ${theme.colors.sema4}`,
          },
        }),
      },
    },
  })
);
