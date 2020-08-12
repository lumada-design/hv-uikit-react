const styles = theme => ({
  rootList: {
    width: 310,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
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
    padding: `0px ${theme.hv.spacing.sm}px ${theme.hv.spacing.xs}px ${theme.hv.spacing.sm}px`
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
  listBorderDown: {
    height: `${theme.hv.spacing.sm}px`
  }
});

export default styles;
