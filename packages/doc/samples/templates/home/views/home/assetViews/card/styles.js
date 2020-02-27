const styles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  kpis: {
    display: "flex"
  },
  timestamp: {
    paddingRight: `${theme.hv.spacing.xs}px`,
    marginRight: "10px",
    borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`
  },
  container: {
    marginLeft: "-15px"
  }
});

export default styles;
