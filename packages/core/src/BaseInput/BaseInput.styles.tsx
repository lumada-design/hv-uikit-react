import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvBaseInput", {
  root: {
    // #region `input` style reset
    "input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0px 1000px ${theme.colors.atmo1} inset`,
      WebkitTextFillColor: theme.colors.secondary,
    },

    // Clears number input up/down arrows in Chrome and Firefox
    "input[type=number]": {
      MozAppearance: "textfield",
      "&::-webkit-outer-spin-button,&::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },

    // Clears time input clock in Chrome
    "input::-webkit-calendar-picker-indicator": {
      display: "none",
    },

    // Clears search input clear button in Chrome
    "input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration":
      {
        display: "none",
      },
    // #endregion

    display: "inline-flex",
    width: "100%",
    position: "relative",
    margin: 0,
    borderRadius: theme.radii.base,
    height: "32px",
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    boxSizing: "border-box",
    backgroundColor: theme.colors.atmo1,
    fontFamily: theme.fontFamily.body,

    ":hover:not($disabled,$invalid,$readOnly)": {
      borderColor: theme.colors.primary,
    },
    ":focus-within:not($disabled)": {
      ...outlineStyles,
    },
  },
  disabled: {
    backgroundColor: theme.colors.atmo2,
    borderColor: theme.colors.secondary_60,

    cursor: "not-allowed",

    "&&::before": {
      borderBottomStyle: "none",
    },
  },
  invalid: {
    borderColor: theme.colors.negative_120,
  },
  multiline: {
    padding: 0,
    overflow: "auto",
    height: "auto",

    "& $input": {
      borderRadius: theme.radii.base,
      height: "auto",
      minHeight: "21px",
      padding: "5px 10px",
      overflow: "auto",
      margin: 0,
    },
  },
  resizable: { width: "auto" },
  readOnly: {
    borderColor: theme.colors.secondary_60,
    backgroundColor: theme.colors.atmo2,
  },
  focused: {},
  /** @deprecated unused. use `::after` instead */
  inputBorderContainer: {},
  /** @deprecated use `classes.invalid` instead */
  inputRootInvalid: { borderColor: theme.colors.negative_120 },
  /** @deprecated use `classes.readOnly` instead */
  inputRootReadOnly: {
    borderColor: theme.colors.secondary_60,
    backgroundColor: theme.colors.atmo2,
  },
  /** @deprecated use `classes.root` instead */
  inputRoot: {},
  /** @deprecated unused */
  inputRootFocused: {},
  /** @deprecated use `classes.disabled` instead */
  inputRootDisabled: {},
  /** @deprecated use `classes.multiline` instead */
  inputRootMultiline: {},
  input: {
    height: "100%",
    marginLeft: theme.space.xs,
    marginRight: theme.space.xs,
    padding: 0,
    backgroundColor: "transparent",
    overflow: "hidden",
    textOverflow: "ellipsis",
    outline: "none",
    width: "initial",
    flexGrow: 1,
    ...theme.typography.body,

    "&::placeholder": {
      opacity: 1,
      color: theme.colors.secondary_80,
    },
  },
  inputDisabled: {
    color: theme.colors.secondary_60,
    WebkitTextFillColor: theme.colors.secondary_60,
  },
  inputReadOnly: {
    color: theme.colors.secondary_80,
  },
  inputResizable: {
    resize: "both",
    width: "100%",
  },
});
