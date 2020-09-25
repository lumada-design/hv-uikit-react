const styles = theme => ({
  root: {},
  selectorContainer: {
    width: "100%"
  },
  truncate: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  box: {
    width: "32px",
    height: "32px",
    marginLeft: "auto"
  },
  icon: {
    "& svg": {
      boxShadow: "none !important",
      outline: "none !important"
    }
  },
  item: {
    "&$itemSelector": {
      backgroundColor: "transparent"
    }
  },
  itemSelector: {},
  link: {
    ...theme.hv.typography.normalText,
    textDecoration: "none",

    "&:focus": {
      boxShadow: "unset !important"
    }
  }
});

export default styles;

export const selectAllStyles = () => ({
  root: {
    margin: 0
  },
  selectAllContainer: {
    width: "100%"
  },
  selectAll: {
    width: "100%"
  }
});
