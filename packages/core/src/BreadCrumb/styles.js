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
    fontWeight: 400,
    color: theme.hv.palette.accent.acce1,
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  separatorContainer: {
    margin: theme.hvSpacing(0, "xs"),
  },
  orderedList: {
    display: "flex",
  },
  a: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    "&:focus > p": {
      color: theme.hv.palette.accent.acce1,
      textDecoration: "underline",
    },
  },
});

export default styles;
