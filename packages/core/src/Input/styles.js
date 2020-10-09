import "focus-within-polyfill";

const styles = (theme) => ({
  root: {
    minWidth: "150px",
    maxWidth: "610px",
  },
  inputRoot: {
    "&:hover, &:focus-within": {
      "& $iconClear": {
        visibility: "visible",
      },
    },
    "&:focus-within $iconClear": {
      visibility: "visible",
    },
  },
  inputRootDisabled: {
    cursor: "not-allowed",
  },
  inputRootFocused: {
    "& $iconClear": { visibility: "visible" },
  },
  inputRootInvalid: {},
  input: {
    "&::-ms-clear": {
      display: "none",
    },
  },
  inputDisabled: {
    cursor: "not-allowed",
  },
  multiLine: {
    padding: 0,
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    paddingBottom: "6px",
    display: "block",
  },
  labelDisabled: {},
  adornmentsBox: {
    display: "flex",
    flexDirection: "row",
    height: 30,
    justifyContent: "center",
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
    top: "-1px",
  },
  suggestionList: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    boxShadow: "0 0 0 #fff, 0px -5px 12px -5px rgba(65,65,65,.12)",
    padding: theme.hv.spacing.sm,
    position: "absolute",
    width: "100%",
  },
  "@global": {
    "input:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0px 1000px ${theme.hv.palette.atmosphere.atmo1} inset`,
      "-webkit-text-fill-color": theme.hv.typography.normalText.color,
    },
  },
});

export default styles;
