const labelBaseStyle = theme => ({
  ...theme.hv.typography.highlightText,
  fontFamily: theme.hv.typography.fontFamily,
  padding: "0 5px",
  wordBreak: "keep-all",
  color: theme.hv.palette.atmosphere.atmo1
});

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
    minHeight: "8px",
    minWidth: "8px"
  },
  badgeIcon: {
    position: "relative",
    top: "1px",
    left: "-7px"
  },
  showCount: {
    ...labelBaseStyle(theme),
    maxWidth: 30
  },
  showLabel: {
    ...labelBaseStyle(theme)
  },
  badgeOneDigit: {
    padding: 0,
    width: "16px",
    textAlign: "center"
  }
});

export default styles;
