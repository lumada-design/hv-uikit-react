const styles = theme => ({
  root: {
    padding: `${theme.hv.spacing.sm}px`,
    display: "flex",
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    boxShadow: "0 2px 12px rgba(65,65,65,.12)",
    width: "fit-content",
    zIndex: 100
  },
  separator: {
    width: `${theme.hv.spacing.xs}px`
  }
});

export default styles;
