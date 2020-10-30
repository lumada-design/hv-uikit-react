const styles = (theme) => ({
  rootClosed: {
    display: "none",
  },
  root: {
    minWidth: `calc(100% - ${theme.hv.spacing.sm}px)`,
  },
  anchorOriginTopCenter: {
    top: theme.hv.spacing.xs,
  },
  anchorOriginBottomCenter: {
    bottom: theme.hv.spacing.xs,
  },
});

export default styles;
