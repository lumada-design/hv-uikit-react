const spacing = theme => key => {
  switch (typeof key) {
    case "string":
      return Number(theme.spacing[key]) || 0;
    case "number":
      return 7.5 * key || 0
    default:
      return 0;
  }
};

export default spacing;
