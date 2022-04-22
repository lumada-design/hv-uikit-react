const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",

    overflow: "hidden",

    // we need to play with the 4px because of the focus ring
    padding: `${theme.hv.spacing.sm - 4}px 0 ${theme.hv.spacing.sm - 4}px ${
      theme.hv.spacing.sm - 4
    }px`,

    backgroundColor: theme.hv.palette.atmosphere.atmo1,
  },

  single: {
    width: 320,
  },
  dual: {
    width: 620,
  },
  fluid: {},

  closed: {
    display: "none",
  },
  open: {
    zIndex: "1200",
    position: "absolute",
    top: "50px",
    overflowX: "hidden",
    boxShadow: theme.hv.shadows[1],
  },

  title: {
    minHeight: 36,

    // we need to play with the 4px because of the focus ring
    padding: `4px ${theme.hv.spacing.sm}px ${theme.hv.spacing.sm - 4}px 4px`,

    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  actionsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",

    overflowY: "auto",

    // we need to play with the 4px because of the focus ring
    padding: "4px 0 4px 4px",
  },

  footerContainer: {
    display: "flex",
    alignItems: "center",

    marginTop: "auto",

    height: 52,

    // we need to play with the 4px because of the focus ring
    padding: `${theme.hv.spacing.sm - 4}px ${theme.hv.spacing.sm + 4}px 4px 4px`,

    ...theme.hv.typography.highlightText,
  },

  item: {},
  itemSelected: {},
  itemDisabled: {},
  itemTypography: {},
  itemIcon: {},
  itemTitle: {},
  itemInfo: {},
});

export default styles;
