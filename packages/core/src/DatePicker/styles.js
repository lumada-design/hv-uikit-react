import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {
    position: "relative",
    width: 320,
    display: "inline-block",
  },
  inputContainer: {
    position: "relative",
    background: theme.palette.atmo1,
    height: 32,
    paddingLeft: theme.hvSpacing("xs"),
    paddingRight: theme.hvSpacing("md"),
    fontFamily: theme.hv.typography.fontFamily,
    "&:focus": {
      ...outlineStyles,
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

  dropdown: {
    display: "block",
  },
  panel: {
    backgroundColor: theme.palette.atmo1,
  },

  inputCalendarClosed: {
    border: `1px solid ${theme.palette.atmo4}`,
    borderRadius: 2,
    "&:hover": {
      cursor: "pointer",
      border: `1px solid ${theme.palette.acce1}`,
    },
  },
  inputCalendarOpen: {
    boxShadow: theme.hv.shadows[1],
    border: `1px solid ${theme.palette.atmo1}`,
    borderRadius: "2px 2px 0 0",
  },
  input: {
    border: "none",
    height: "30px",
    width: "100%",
    background: "transparent",
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
    "&:hover": {
      cursor: "pointer",
    },
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      fontFamily: theme.hv.typography.fontFamily,
      ...theme.hv.typography.placeholderText,
    },
    "&::-moz-placeholder": {
      lineHeight: "26px",
    },
  },
  dropdownHeaderInvalid: {
    border: `1px solid ${theme.hv.palette.semantic.sema4}`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.semantic.sema4}`,
    },
  },
  dropdownHeaderOpen: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
    },
  },
  icon: {
    position: "absolute",
    right: -1,
    bottom: -1,
  },
  action: {
    "&:first-child": {
      marginRight: theme.hvSpacing("xs"),
    },
  },

  rangeMainContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.atmo1,
    width: "640px",
  },
  rangeCalendarsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  rangeCalendarContainer: {
    width: "50%",
  },
});

export default styles;
