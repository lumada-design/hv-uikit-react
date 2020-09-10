const styles = {
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
  itemSelector: {
    backgroundColor: "transparent"
  }
};

export default styles;

const selectAllStyles = theme => ({
  root: {
    margin: 0
  },
  editMode: {
    backgroundColor: theme.palette.atmo1,
    "& $selectAll *": {
      color: theme.hv.palette.accent.acce1
    }
  },
  selectAllContainer: {
    width: "100%"
  },
  selectAll: {
    width: "100%"
  }
});

const linkStyles = theme => ({
  a: {
    ...theme.hv.typography.normalText,
    textDecoration: "none",
    "&:focus": {
      boxShadow: "unset !important"
    }
  }
});

export { selectAllStyles, linkStyles };
