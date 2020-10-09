const styles = (theme) => ({
  root: {
    borderRadius: 2,
    "& $label": {
      display: "block",
    },
    "& $selectionDisabled": {
      color: theme.palette.atmo5,
    },
  },
  dropdown: {
    width: 310,
  },
  rootList: {},
  arrow: {},
  label: {
    paddingBottom: "8px",
  },
  placeholder: {
    display: "block",
  },
  selectionDisabled: {
    lineHeight: theme.hv.spacing.md,
  },
});

export default styles;
