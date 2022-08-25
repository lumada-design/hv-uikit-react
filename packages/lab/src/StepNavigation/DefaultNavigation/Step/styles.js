const styles = () => ({
  root: {},
  ghostDisabled: {},
  ghost: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&$ghostDisabled": {
      cursor: "default",
    },
    "&$ghostDisabled&:hover": {
      cursor: "default",
    },
  },
  "not-current": {
    margin: "-8px",
  },
  XS: {},
  SM: {},
  MD: {},
  LG: {},
  XL: {},
  avatar: {
    "&$XS": {
      fontSize: "0.625rem",
    },
    "&$SM": {
      fontSize: "1rem",
    },
    "&$MD": {
      fontSize: "1.5rem",
    },
    "&$LG": {
      fontSize: "2rem",
    },
    "&$XL": {
      fontSize: "2.5rem",
    },
  },
});

export default styles;
