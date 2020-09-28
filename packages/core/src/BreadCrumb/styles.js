const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    zIndex: 0,
  },
  centerContainer: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    maxWidth: "170px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "none",
      color: theme.hv.palette.accent.acce2h,
    },
  },
  separator: {
    display: "contents",
  },
  separatorContainer: {
    width: "32px",
    height: "32px",
  },
  orderedList: {
    display: "flex",
  },
  a: {
    "&:focus > div > p": {
      color: theme.hv.palette.accent.acce2h,
    },
  },
});

export default styles;
