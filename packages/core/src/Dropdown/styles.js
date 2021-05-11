const styles = (theme) => ({
  root: {
    width: "100%",
    borderRadius: 2,
    position: "relative",
    display: "inline-block",
    "& $selectionDisabled": {
      color: theme.palette.atmo5,
    },
    "& $dropdownHeaderInvalid": {
      border: `1px solid ${theme.hv.palette.semantic.sema4}`,
      "&:hover": {
        border: `1px solid ${theme.hv.palette.semantic.sema4}`,
      },
      "&$dropdownHeaderOpen": {
        border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
        "&:hover": {
          border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
        },
      },
    },
    "& $dropdownHeaderOpen": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
      "&:hover": {
        border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
      },
    },
  },
  dropdown: {
    width: "100%",
  },
  rootList: {},
  arrow: {},

  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    paddingBottom: "6px",
    display: "block",
  },
  description: {},
  error: {},

  placeholder: {
    display: "block",
  },
  selectionDisabled: {
    lineHeight: theme.hv.spacing.md,
  },
  dropdownHeaderInvalid: {},
  dropdownHeaderOpen: {},
  dropdownListContainer: {},
});

export default styles;
