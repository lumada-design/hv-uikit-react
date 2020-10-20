import "focus-within-polyfill";

const styles = (theme) => ({
  root: {
    minWidth: "150px",
    maxWidth: "610px",
  },

  hasSuggestions: {},

  inputRoot: {
    "&:hover": {
      "& $iconClear": {
        visibility: "visible",
      },
    },
    "&:focus-within $iconClear": {
      visibility: "visible",
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within $iconClear": {
      visibility: "visible",
    },
  },
  inputRootFocused: {
    "& $iconClear": { visibility: "visible" },
  },
  inputRootDisabled: {
    cursor: "not-allowed",
  },
  inputRootMultiline: {
    padding: 0,
  },
  input: {
    "&::-ms-clear": {
      display: "none",
    },
  },

  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    paddingBottom: "6px",
    display: "block",
  },
  description: {},

  adornmentsBox: {
    display: "flex",
    flexDirection: "row",
    height: 30,
    justifyContent: "center",
    position: "absolute",
    top: 1,
    right: 1,
  },
  adornmentButton: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconClear: {
    visibility: "hidden",
  },

  suggestionsContainer: {
    width: "100%",
    position: "relative",
  },
  suggestionList: {
    // ensure more specificity than .HvSuggestions-root .HvSuggestions-list
    "$root $suggestionsContainer &": {
      width: "100%",
    },
  },

  inputExtension: {
    height: theme.hv.spacing.xs,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    boxShadow: `0px 8px 0px ${theme.hv.palette.atmosphere.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`,
  },

  inputBorderContainer: {
    "$hasSuggestions &": {
      display: "none",
    },
  },

  "@global": {
    "input:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0px 1000px ${theme.hv.palette.atmosphere.atmo1} inset`,
      "-webkit-text-fill-color": theme.hv.typography.normalText.color,
    },
  },
});

export default styles;
