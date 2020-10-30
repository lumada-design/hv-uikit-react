const styles = (theme) => ({
  message: {
    color: theme.hv.palette.base.base2,
    wordBreak: "break-word",
    maxWidth: "700px",
    overflow: "hidden",
    marginRight: 10,
  },
  iconContainer: {
    marginRight: theme.hv.spacing.xs,
    marginLeft: -theme.hv.spacing.xs,
  },
  actionMessageContainer: {
    flex: "0 0 auto",
  },
});

export default styles;
