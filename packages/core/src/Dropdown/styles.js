const styles = theme => ({
  root: {
    width: "310px"
  },
  rootList: {},
  arrow: {},
  label: {
    paddingBottom: "8px",
    display: "block"
  },
  truncate: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  selectionDisabled: {
    ...theme.hv.typography.placeholderText,
    lineHeight: `${theme.hv.spacing.md}px`
  }
});

export default styles;
