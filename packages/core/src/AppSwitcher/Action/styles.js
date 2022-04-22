const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 280,
    minHeight: 52,
    marginRight: theme.hv.spacing.sm,
  },
  disabled: {},
  selected: {},

  typography: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",

    width: "100%",
    minHeight: 52,

    padding: `6px ${theme.hv.spacing.xs}px`,

    border: "none",
    borderLeft: `solid 2px ${theme.hv.palette.accent.acce1}`,

    cursor: "pointer",

    textDecoration: "inherit",
    color: "inherit",
    backgroundColor: "inherit",

    "$disabled &": {
      cursor: "not-allowed",
    },
  },

  icon: {
    display: "flex",
    minWidth: 40,
    justifyContent: "center",
  },

  title: {
    flexGrow: 1,
    margin: `0 ${theme.hv.spacing.xs}px`,

    textAlign: "left",

    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",

    color: "inherit",
  },

  iconInfo: {
    minWidth: 32,
  },

  iconUrl: {
    width: 32,
  },
});

export default styles;
