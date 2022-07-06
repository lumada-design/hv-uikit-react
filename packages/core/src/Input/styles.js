import "focus-within-polyfill";

const styles = (theme) => ({
  root: {
    display: "block",
  },

  hasSuggestions: {},

  inputRoot: {
    "&:hover": {
      "& $iconClear": {
        display: "block",
      },
    },
    "&:focus-within $iconClear": {
      display: "block",
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within $iconClear": {
      display: "block",
    },
  },
  inputRootFocused: {
    "& $iconClear": { display: "block" },
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
  error: {},

  adornmentsBox: {
    display: "flex",
    flexDirection: "row",
    height: "30px",
    justifyContent: "center",
    marginRight: 1,
  },
  adornmentButton: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
  },
  icon: {
    width: "30px",
    height: "30px",
  },
  iconClear: {
    display: "none",
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
});

export default styles;
