const styles = theme => ({
  rootList: {
    width: 310
  },
  listContainer: {
    overflow: "auto",
    maxHeight: 270,
    paddingLeft: `${theme.hv.spacing.sm}px`,
    marginRight: "2px",
    paddingRight: "18px",
    paddingBottom: `${theme.hv.spacing.sm}px`
  },
  searchContainer: {
    paddingLeft: `${theme.hv.spacing.sm}px`,
    paddingRight: `${theme.hv.spacing.sm}px`,
    paddingBottom: `${theme.hv.spacing.xs}px`
  },
  selectAllContainer: {
    paddingLeft: `${theme.hv.spacing.sm}px`,
    paddingRight: `${theme.hv.spacing.sm}px`,
    width: "100%"
  },
  selectAll: {
    "& > span": {
      ...theme.hv.typography.highlightText
    }
  },
  selection: {
    width: "100%"
  },
  actions: {
    textAlign: "right",
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    padding: `${theme.hv.spacing.sm}px`
  },
  marginTop: {
    marginTop: `${theme.hv.spacing.sm}px`
  },
  listBorderUp: {
    display: "block",
    height: `${theme.hv.spacing.xs}px`,
    boxShadow: " 0px -5px 5px -4px rgba(65,65,65,.12)"
  },

  listBorderDown: {
    display: "block",
    height: `${theme.hv.spacing.sm}px`,
    marginTop: "12px",
    boxShadow: `0 0 0 ${theme.hv.palette.atmosphere.atmo1}, 0px -5px 12px -5px rgba(65,65,65,.12)`
  },
  list: {
    maxWidth: 310,
    minWidth: 310,
    background: theme.hv.palette.atmosphere.atmo1,
    border: `1px solid ${theme.hv.palette.accent.acce1}`,
    borderTop: "none",
    zIndex: 1000
  },
  listClosed: {
    display: "none"
  },
  listOpenDown: {
    display: "block",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: `0 -8px 0 ${theme.hv.palette.atmosphere.atmo1}, 0 1px 8px rgba(65,65,65,.12)`
  },
  listOpenUp: {
    display: "block",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: `0 8px 0 ${theme.hv.palette.atmosphere.atmo1}, 0 1px 8px rgba(65,65,65,.12)`
  }
});

export default styles;
