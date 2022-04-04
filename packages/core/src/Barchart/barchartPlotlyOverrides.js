import clone from "lodash/cloneDeep";

const setterIfNil = (object, property, value) => {
  // eslint-disable-next-line no-param-reassign
  object[property] = object[property] ?? value;
};

/**
 * Auxiliary functions to set the layout in order to follow the DS guideline.
 */
export const applyLayoutDefaults = (inputLayout, stack, isHorizontal) => {
  const layout = inputLayout === undefined ? {} : clone(inputLayout);
  setterIfNil(layout, "bargap", 0.25);
  setterIfNil(layout, "bargroupgap", 0.25);
  setterIfNil(layout, "hovermode", "closest");
  if (stack) setterIfNil(layout, "barmode", "stack");

  setterIfNil(layout, "yaxis", {});
  setterIfNil(layout, "xaxis", {});

  if (isHorizontal) {
    setterIfNil(layout.yaxis, "showline", true);
    setterIfNil(layout.xaxis, "showline", false);
  } else {
    setterIfNil(layout.yaxis, "showline", false);
  }

  return layout;
};

export const applyDataDefaults = (inputData, isHorizontal) => {
  const data = inputData;

  data.forEach((trace) => {
    setterIfNil(trace, "type", "bar");
    setterIfNil(trace, "hoverinfo", "none");
    if (isHorizontal) setterIfNil(trace, "orientation", "h");
  });

  return data;
};
