import { outlineStyles } from "../../../Focus/styles";

const styles = theme => ({
  rangeLabel: {
    paddingBottom: "10px"
  },
  background: {
    backgroundColor: theme.palette.atmo3,
    borderBottom: `1px solid ${theme.palette.atmo4}`,
    borderTop: "1px solid transparent",
    borderLeft: "1px solid transparent",
    borderRight: "1px solid transparent"
  },
  headerDayOfWeek: {
    paddingTop: "5px",
    paddingLeft: theme.spacing("xs")
  },
  headerDate: {
    padding: `5px ${theme.spacing("xs")}px`
  },
  invalid: {
    border: `1px solid ${theme.palette.sema4}`
  },
  input: {
    border: "none",
    backgroundColor: "transparent",
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.mTitle,
    width: "100%",
    "&::-webkit-inner-spin-button, &::-webkit-calendar-picker-indicator": {
      " -webkit-appearance": "none",
      display: "none"
    },
    "&:focus": {
      ...outlineStyles
    }
  }
});

export default styles;
