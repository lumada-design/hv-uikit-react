import values from "lodash/values";
import mapValues from "lodash/mapValues";

const spacing = theme => key => {
  const spacings = mapValues(theme.spacing, Number);

  switch (typeof key) {
    case "string":
      return spacings[key.toLowerCase()] || 0;
    case "number":
      return values(spacings)[key - 1] || 0;
    default:
      return 0;
  }
};

export default spacing;
