const styles = theme => ({
  root: {
    minWidth: 70,
    textTransform: "none",
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
    "&:focus, &:hover": {
      background: theme.hv.palette.atmosphere.atmo4
    },
    marginRight: 0,
    "&$disabled": {
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed",
      pointerEvents: "all",
      opacity: 1,
      "&:focus, &:hover": {
        background: "none"
      }
    },
    opacity: 1
  },
  labelContainer: {
    padding: "16px 20px"
  },
  selected: {
    ...theme.hv.typography.highlightText,
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo4
    }
  },
  disabled: {}
});

export default styles;
