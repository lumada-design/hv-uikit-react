const styles = (theme) => ({
  rootList: {
    width: "100%",
    backgroundColor: theme.palette.atmo1,
  },
  listContainer: {
    padding: theme.hvSpacing("sm"),
  },
  searchContainer: {
    marginBottom: theme.hvSpacing("xs"),
  },
  selectAllContainer: {
    // prevent the focus ring to be hidden by sibling hover background
    "&": {
      position: "relative",
      zIndex: 0,
    },
    "&:focus-within": {
      zIndex: 1,
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      zIndex: 1,
    },
  },
  selectAll: {
    width: "100%",
  },
  selection: {
    width: "100%",
  },
  listBorderDown: {},
  dropdownListContainer: {},
});

export default styles;
