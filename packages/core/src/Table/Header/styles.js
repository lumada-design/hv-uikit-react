const styles = (theme) => ({
  headerContainer: {
    width: "100%",
    display: "flex",
  },
  headerProps: {
    width: "100%",
    whiteSpace: "normal",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxHeight: 42,
  },
  headerTextContainer: {
    minWidth: 0,
    padding: `6px ${theme.hv.spacing.xs}px 6px 0px`,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  headerNotSortable: {
    width: `calc(100% - ${theme.hv.spacing.xs}px)`,
    marginLeft: `${theme.hv.spacing.xs}px`,
  },
  headerSortable: {
    maxWidth: "calc(100% - 32px)",
  },
  headerAlphaNumeric: {
    float: "left",
    textAlign: "left",
  },
  headerNumeric: {
    float: "right",
    textAlign: "right",
  },
  rtSortIcon: {
    "&:focus": {
      outline: 0,
    },
  },
  rtSortIconNumeric: {
    marginLeft: "auto",
  },
});

export default styles;
