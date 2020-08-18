const styles = theme => ({
  rootList: {
    width: 310,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  listContainer: {
    overflow: "auto",
    marginRight: "2px",
    padding: `5px ${theme.hv.spacing.sm}px 18px ${theme.hv.spacing.sm}px`
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
    height: "15px"
  }
});

export default styles;
