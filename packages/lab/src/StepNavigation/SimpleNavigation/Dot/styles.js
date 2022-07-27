const styles = {
  root: {
    borderRadius: "50%",
    zIndex: 1,
  },
  ghostDisabled: {},
  active: {},
  ghost: {
    "&$active": {
      cursor: "default",
    },
    "&$active&:hover": {
      cursor: "default",
    },
  },
};

export default styles;
