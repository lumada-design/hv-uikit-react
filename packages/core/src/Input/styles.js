import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  container: {
    minWidth: "150px",
    maxWidth: "610px"
  },
  inputRoot: {
    margin: "0",
    width: "100%",
    borderStyle: "solid",
    borderWidth: " 0 0 1px 0",
    background: theme.hv.palette.atmosphere.atmo1,
    borderColor: theme.hv.palette.atmosphere.atmo6,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: " 0 0 1px 0",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo1
    },
    "&:hover, &:focus-within": {
      "& $iconClear": {
        visibility: "visible"
      }
    }
  },
  inputRootDisabled: {
    borderColor: theme.hv.palette.atmosphere.atmo6,
    background: theme.hv.palette.atmosphere.atmo4,
    "&:hover": {
      borderColor: theme.hv.palette.atmosphere.atmo6,
      background: theme.hv.palette.atmosphere.atmo4,
      cursor: "not-allowed"
    },
    cursor: "not-allowed"
  },
  inputRootFocused: {
    borderStyle: "solid",
    borderWidth: " 0 0 1px 0",
    borderColor: theme.hv.palette.accent.acce1,
    background: theme.hv.palette.atmosphere.atmo1,
    ...outlineStyles,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: "0 0 1px 0",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo1
    },
    "& $iconClear": { visibility: "visible" }
  },
  inputRootInvalid: {
    borderColor: theme.hv.palette.semantic.sema4,
    "&:hover": {
      borderColor: theme.hv.palette.semantic.sema4
    }
  },
  input: {
    height: `20px`,
    marginLeft: `${theme.hv.spacing.xs}px`,
    marginRight: `${theme.hv.spacing.xs}px`,
    padding: "6px 0 5px",
    ...theme.hv.typography.normalText,
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&::placeholder": {
      ...theme.hv.typography.placeholderText,
      opacity: 1
    },
    "&::-ms-clear": {
      display: "none"
    }
  },
  inputDisabled: {
    cursor: "not-allowed"
  },
  multiLine: {
    padding: 0
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  label: {
    paddingBottom: "8px",
    display: "block"
  },
  labelDisabled: {
    color: theme.hv.palette.atmosphere.atmo7
  },
  infoIconContainer: {
    height: "32px",
    width: "32px",
    display: "flex",
    justifyContent: "center",
    "& div": {
      alignSelf: "center",
      marginTop: -2
    }
  },
  infoText: {
    paddingTop: "8px",
    display: "block"
  },
  textWarning: {
    color: theme.hv.palette.accent.acce1
  },

  adornmentsBox: {
    display: "flex",
    flexDirection: "row",
    height: 30,
    justifyContent: "center"
  },
  adornmentButton: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer"
  },
  icon: {
    width: 30,
    height: 30
  },
  iconClear: {
    visibility: "hidden"
  },

  suggestionsContainer: {
    width: "100%",
    position: "relative",
    top: "-1px"
  },
  suggestionList: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    boxShadow: "0 0 0 #fff, 0px -5px 12px -5px rgba(65,65,65,.12)",
    padding: `${theme.hv.spacing.sm}px`,
    position: "absolute",
    width: "100%"
  },
  "@global": {
    "input:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0px 1000px ${theme.hv.palette.atmosphere.atmo1} inset`,
      "-webkit-text-fill-color": theme.hv.typography.normalText.color
    }
  }
});

export default styles;
