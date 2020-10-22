import { outlineStyles } from "../../Focus/styles";

const styles = (theme) => ({
  rangeLabel: {
    paddingBottom: theme.hvSpacing("xs"),
  },
  root: {
    marginTop: theme.hvSpacing("xs"),
    backgroundColor: theme.palette.atmo1,
    borderBottom: `1px solid ${theme.palette.atmo4}`,
    borderTop: "1px solid transparent",
    borderLeft: "1px solid transparent",
    borderRight: "1px solid transparent",
    "&:hover, &:focus": {
      borderBottom: `1px solid ${theme.palette.acce1}`,
    },
  },
  headerDayOfWeek: {
    paddingLeft: theme.hvSpacing("xs"),
  },
  headerDate: {},
  invalidMessageStyling: {
    display: "flex",
    alignItems: "center",
  },
  invalid: {
    border: `1px solid ${theme.palette.sema4}`,
  },
  input: {
    border: "none",
    backgroundColor: "transparent",
    padding: `5px ${theme.hvSpacing("xs")}`,
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.xsTitle,
    width: "100%",
    "&::placeholder": {
      color: theme.palette.atmo5,
    },
    "&::-webkit-inner-spin-button, &::-webkit-calendar-picker-indicator": {
      " -webkit-appearance": "none",
      display: "none",
    },
    "&:focus": {
      outline: "none",
    },
    "&.focus-visible": {
      ...outlineStyles,
    },
  },
});

export default styles;
