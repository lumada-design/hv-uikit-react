const styles = (theme) => ({
  root: {
    display: "none",
  },
  topBorder: {
    borderTop: `solid 1px ${theme.hv.palette.semantic.sema4}`,
  },
  topGutter: { paddingTop: 8 },
  warningText: {
    color: theme.hv.palette.semantic.sema4,
    paddingRight: theme.hv.spacing.xs,
    "&:first-child": {
      paddingLeft: theme.hv.spacing.xs,
    },
  },
  defaultIcon: {
    minWidth: "32px",
  },
  show: {
    display: "flex",
  },
  hideText: {
    // display none or visibility hidden prevents
    // browser to trigger the aria-alert
    width: 0,
    height: 0,
    padding: 0,
    margin: 0,
    overflow: "hidden",
  },
});

export default styles;
