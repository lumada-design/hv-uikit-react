const styles = theme => ({
  root: {
    borderRadius: 2
  },
  dropdown: {
    width: 310
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
