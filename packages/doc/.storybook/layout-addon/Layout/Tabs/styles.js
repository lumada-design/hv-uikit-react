const styles = theme => ({
  root: {
    flexGrow: 1
  },
  tabsRoot: {
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    margin: "60px 0 20px"
  },
  tabsIndicator: {
    backgroundColor: theme.hv.palette.accent.acce1,
    bottom: "none",
    top: 0
  },
  tabRoot: {
    textTransform: "initial",
    marginRight: theme.spacing("sm"),
    "&:hover": {
      opacity: 1
    },
    "&$tabSelected": {},
    "&:focus": {},
    ...theme.hv.typography.highlightText
  },
  tabSelected: {},
  props: {
    marginTop: 20
  }
});

export default styles;
