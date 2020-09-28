const styles = (theme) => ({
  root: {
    display: "flex",
    minHeight: "68px",
    backgroundColor: theme.palette.common.white,
    color: theme.hv.palette.accent.acce1,
    padding: `${theme.hv.spacing.sm}px ${theme.hv.spacing.sm}px`,

    "&$read": {
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
    },
  },
  read: {},
  iconContainer: {
    width: "32px",
    marginRight: `${theme.hv.spacing.sm}px`,
  },
  title: {
    ...theme.hv.typography.highlightText,
    marginBottom: "5px",

    "&$read": {
      ...theme.hv.typography.normalText,
    },
  },
  timeContainer: {
    ...theme.hv.typography.vizText,
    display: "flex",
    alignItems: "center",
  },
  bullet: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    marginRight: "6px",
    backgroundColor: theme.palette.common.black,

    "&$hide": {
      display: "none",
    },
  },
  hide: {},
});

export default styles;
