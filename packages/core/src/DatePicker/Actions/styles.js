const styles = (theme) => ({
  button: {
    color: theme.palette.acce1,
    "& span": {
      color: theme.palette.acce1,
    },
    "&:nth-child(1)": {
      marginRight: theme.spacing("xs"),
    },
  },
});

export default styles;
