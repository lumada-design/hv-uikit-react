const styles = (theme) => ({
  rootList: {
    width: 310,
    backgroundColor: theme.palette.atmo1,
  },
  listContainer: {
    padding: theme.spacing("sm"),
  },
  searchContainer: {
    marginBottom: theme.spacing("xs"),
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
});

export default styles;
