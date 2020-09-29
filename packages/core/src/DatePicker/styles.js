import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {
    position: "relative",
    width: 320,
  },
  inputContainer: {
    position: "relative",
    background: theme.palette.atmo1,
    height: 32,
    paddingLeft: theme.spacing("xs"),
    paddingRight: theme.spacing("md"),
    fontFamily: theme.hv.typography.fontFamily,
    "&:focus": {
      ...outlineStyles,
    },
  },

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
  icon: {
    position: "absolute",
    right: -1,
    bottom: -1,
  },
  label: {
    display: "block",
  },
  action: {
    "&:first-child": {
      marginRight: theme.spacing("xs"),
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
