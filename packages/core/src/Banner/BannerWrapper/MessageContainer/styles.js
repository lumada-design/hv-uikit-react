const styles = theme => ({
  message: {
    color: theme.hv.palette.base.base2,
    wordBreak: "break-word",
    maxWidth: "700px",
    overflow: "hidden"
  },
  iconContainer: {
    marginRight: `${theme.hv.spacing.xs}px`
  },
  actionMessageContainer: {
    flex: "0 0 auto"
  }
});

export default styles;
