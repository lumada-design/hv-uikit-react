const styles = (theme) => ({
  root: {},
  virtualizedRoot: {
    marginBottom: 5,
  },

  selectorRoot: {
    width: "100%",
    zIndex: 0,
  },
  selectorContainer: {
    "&:hover": {
      backgroundColor: "transparent",
    },

    "&:focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
  },
  truncate: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  box: {
    width: "32px",
    height: "32px",
    marginLeft: "auto",
  },

  itemSelector: {
    "&:not(:hover):not(.HvIsFocused):not(:focus-within)": {
      backgroundColor: "transparent",
    },
    "&:not(:hover):not(.HvIsFocused):not(.focus-within)": {
      backgroundColor: "transparent",
    },
  },
  link: {
    ...theme.hv.typography.normalText,
    textDecoration: "none",

    "&:focus": {
      boxShadow: "unset !important",
    },
  },

  selectAllSelector: {
    width: "100%",
    margin: "0 0 2px 0",

    position: "relative",
    zIndex: 0,

    // prevent the focus ring to be hidden by sibling hover background
    "&:focus-within": {
      zIndex: 1,
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      zIndex: 1,
    },
  },
});

export default styles;
