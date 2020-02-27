const styles = theme => ({
  verticalContainer: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    width: "320px",
    height: "100%",
    overflow: "hidden",
    "& >div": {
      height: "100%"
    }
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
  listContainer: {
    height: "100%",
    overflowY: "hidden"
  },
  searchBoxContainer: {
    margin: "20px 20px 8px 20px"
  },
  withSearch: {
    maxHeight: "calc(100% - 61px)"
  },
  withTitle: {
    maxHeight: "calc(100% - 63px)"
  },
  withTitleAndSearch: {
    maxHeight: "calc(100% - 130px)"
  },
  scrollContainer: {
    overflowY: "auto",
    padding: "20px"
  },
  actionContainer: {
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    paddingLeft: `${theme.hv.spacing.sm}px`,
    paddingRight: `${theme.hv.spacing.sm}px`,
    paddingBottom: `${theme.hv.spacing.sm}px`,
    paddingTop: `${theme.hv.spacing.xs}px`
  },
  soloActionContainer: {
    borderTop: `none`
  }
});

export default styles;
