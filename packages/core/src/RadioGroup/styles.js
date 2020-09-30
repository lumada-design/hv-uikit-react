const styles = (theme) => ({
  root: {
    display: "inline-block",
    padding: 0,
    margin: 0,
  },

  label: {
    marginBottom: theme.hv.spacing.xs,
  },

  group: {
    display: "flex",
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

  selectAll: {
    // ensure more specificity than .HvCheckBox-root .HvCheckBox-label
    "$group>& label": {
      // not spreading theme.hv.typography.highlightText, it overrides too many things
      fontWeight: 600,
    },
  },

  error: {
    marginTop: theme.hv.spacing.xs,
  },
});

export default styles;
