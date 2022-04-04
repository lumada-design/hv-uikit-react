import clone from "lodash/cloneDeep";

const setterIfNil = (object, property, value) => {
  // eslint-disable-next-line no-param-reassign
  object[property] = object[property] ?? value;
};

/**
 * Auxiliary functions to set the data in order to follow the DS guideline.
 *
 */
export const applyDataDefaults = (inputData, type) => {
  const data = inputData;

  data.forEach((trace) => {
    setterIfNil(trace, "hoverinfo", "none");
    setterIfNil(trace, "textinfo", "none");
    setterIfNil(trace, "type", "pie");

    switch (type) {
      case "thin":
        setterIfNil(trace, "hole", "0.94");
        break;
      case "regular":
      default:
        setterIfNil(trace, "hole", "0.76");
    }
  });

  return data;
};

export const applyLayoutDefaults = (inputLayout) => {
  const defaultLayout = {};

  return !inputLayout ? defaultLayout : clone(inputLayout);
};
