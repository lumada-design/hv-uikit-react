import fade from "../utils/hexToRgbA";

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.atmo1,
    marginBottom: theme.hv.spacing.xs,
  },
  semantic: {
    backgroundColor: theme.palette.sema7,
    "& $selectAll div": {
      color: theme.palette.base2,
      "&:hover:not(:disabled)": {
        backgroundColor: fade(theme.palette.base1, 0.3),
      },
      "& *": {
        color: theme.palette.base2,
        backgroundColor: "transparent",
      },
    },
    "& $selectAll:focus-within div": {
      backgroundColor: fade(theme.palette.base1, 0.3),
    },
    // IE fallback code (using focus-within-polyfill)
    "& $selectAll.focus-within div": {
      backgroundColor: fade(theme.palette.base1, 0.3),
    },
  },
  selectAllContainer: {
    display: "flex",
  },
  selectAll: {},
  selectAllPages: {},
  actions: {
    display: "inline-flex",
    marginLeft: "auto",
  },
});

export default styles;
