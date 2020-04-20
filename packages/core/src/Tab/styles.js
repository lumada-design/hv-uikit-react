const styles = theme => ({
  root: {
    minWidth: 70,
    padding: "16px 20px",
    textTransform: "none",
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
    "&:focus, &:hover": {
      background: theme.hv.palette.atmosphere.atmo4
    },
    marginRight: 0,
    "&$selected": {
      fontWeight: 600,
      "&:hover": {
        background: theme.hv.palette.atmosphere.atmo4
      }
    },
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
  selected: {},
  disabled: {}
});

export default styles;
