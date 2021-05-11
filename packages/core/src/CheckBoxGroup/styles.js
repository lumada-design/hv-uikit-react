const styles = (theme) => ({
  root: {
    display: "inline-block",
    padding: 0,
    margin: 0,
    overflow: "hidden",
    verticalAlign: "top",
  },

  label: {
    marginBottom: theme.hv.spacing.xs,
  },

  group: {
    display: "flex",
  },
  vertical: {
    flexDirection: "column",

    // prevent the focus ring to be hidden by sibling hover background
    "&>*": {
      zIndex: 0,
    },
    "&>*:focus-within": {
      zIndex: 1,
    },
    // IE fallback code (using focus-within-polyfill)
    "&>*.focus-within": {
      zIndex: 1,
    },
  },
  horizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -theme.hv.spacing.sm,
    "&>*": {
      marginLeft: theme.hv.spacing.sm,
    },
  },

  invalid: {
    paddingBottom: theme.hv.spacing.xs,
    borderBottom: `1px solid ${theme.hv.palette.semantic.sema4}`,
  },

  selectAll: {},

  error: {},
});

export default styles;
