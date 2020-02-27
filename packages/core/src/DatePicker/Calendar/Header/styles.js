const styles = theme => ({
  rangeLabel: {
    paddingBottom: "10px"
  },
  background: {
    backgroundColor: `${theme.hv.palette.atmosphere.atmo3}`,
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    borderTop: "1px solid transparent",
    borderLeft: "1px solid transparent",
    borderRight: "1px solid transparent"
  },
  headerDayOfWeek: {
    paddingTop: "5px",
    paddingLeft: `${theme.hv.spacing.xs}px`
  },
  headerDate: {
    padding: `5px ${theme.hv.spacing.xs}px`
  },
  invalid: {
    border: `1px solid ${theme.hv.palette.semantic.sema4}`
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
    }
  }
});

export default styles;
