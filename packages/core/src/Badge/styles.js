const styles = theme => ({
  root: {
    position: "relative",
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
    top: "1px",
    left: "-7px"
  },
  showCount: {
    ...theme.hv.typography.labelText,
    fontFamily: theme.hv.typography.fontFamily,
    padding: "0 5px",
    wordBreak: "keep-all",
    color: theme.hv.palette.atmosphere.atmo1
  },
  badgeOneDigit: {
    padding: 0,
    width: "16px",
    textAlign: "center"
  }
});

export default styles;
