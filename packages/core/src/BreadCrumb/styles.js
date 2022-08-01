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
    maxWidth: "170px",
    color: theme.hv.palette.accent.acce1,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  },
  separatorContainer: {},
  orderedList: {
    display: "flex",
    paddingLeft: 0,
    marginLeft: `-${theme.spacing("xs")}`,
  },
  currentPage: {
    padding: `8px ${theme.spacing("xs")}`,
  },
  a: {
    padding: `8px ${theme.spacing("xs")}`,
    textDecoration: "none",
    borderRadius: "2px",
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
    "&:focus": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  },
});

export default styles;
