const styles = theme => ({
  root: {
    position: "relative",
    height: `${theme.hv.spacing.md}px`,
    "&>*": { float: "left" }
  },
  badgeContainer: {
    width: 0
  },
  badge: {
    borderRadius: `${theme.hv.spacing.xs}px`,
    backgroundColor: theme.hv.palette.accent.acce1,
    float: "left",
    minHeight: "6px",
    minWidth: "6px"
  },
  badgeIcon: {
    position: "relative",
    top: "2px",
    left: "-7px"
  },
  showCount: {
    ...theme.hv.typography.labelText,
    fontFamily: theme.hv.typography.fontFamily,
    padding: "0 0.5em",
    color: theme.hv.palette.atmosphere.atmo1
  },
  badgeOneDigit: {
    padding: 0,
    width: "16px",
    textAlign: "center"
  }
});

export default styles;
