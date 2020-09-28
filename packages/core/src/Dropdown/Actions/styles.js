const styles = (theme) => ({
  button: {
    color: theme.hv.palette.accent.acce1,
    "& span": {
      color: theme.hv.palette.accent.acce1,
    },
    "&:nth-child(1)": {
      marginRight: `${theme.hv.spacing.xs}px`,
    },
  },
});

export default styles;
