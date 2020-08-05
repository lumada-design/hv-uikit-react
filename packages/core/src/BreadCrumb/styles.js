const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    zIndex: 0
  },
  centerContainer: {
    display: "flex",
    alignItems: "center"
  },
  link: {
    textDecoration: "none",
    maxWidth: "170px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 400,
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline"
    }
  },
  separator: {
    display: "contents"
  },
  separatorContainer: {
    width: "32px",
    height: "32px",
    margin: "0 10px"
  },
  orderedList: {
    display: "flex"
  },
  a: {
    "&:focus > div > p": {
      color: theme.hv.palette.accent.acce1,
      textDecoration: "underline"
    }
  }
});

export default styles;
