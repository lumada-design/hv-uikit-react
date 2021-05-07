const styles = (theme) => ({
  root: {
    display: "inline-block",
    padding: 0,
    margin: 0,
  },

  label: {
    marginBottom: theme.hv.spacing.xs,
    float: "left",
  },

  description: {
    float: "left",
  },

  listbox: {
    display: "flex",
    float: "left",
    clear: "both",
    width: "100%",
    paddingBottom: theme.hv.spacing.xs,
  },
  vertical: {
    flexDirection: "column",

    // prevent the focus ring to be hidden by simbling hover background
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
    borderBottom: `1px solid ${theme.hv.palette.semantic.sema4}`,
  },

  selectAll: {
    // ensure more specificity than .HvCheckBox-root .HvCheckBox-label
    "$listbox>& label": {
      // not spreading theme.hv.typography.highlightText, it overrides too many things
      fontWeight: 600,
    },
  },

  error: {
    width: "100%",
    float: "left",
    clear: "both",
  },
});

export default styles;
