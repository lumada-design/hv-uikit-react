import styles from "./styles";

const setterIfNil = (object, property, value) => {
  // eslint-disable-next-line no-param-reassign
  object[property] = object[property] ?? value;
};

/**
 * Auxiliary functions to set the layout in order to follow the DS guideline.
 *
 */

const applyLayoutYaxisDefaults = (inputLayout, layoutStyles, yAxisTitle, isHorizontal) => {
  const layout = inputLayout;

  setterIfNil(layout, "yaxis", {});

  setterIfNil(layout.yaxis, "automargin", true);

  setterIfNil(layout.yaxis, "title", {});

  setterIfNil(layout.yaxis.title, "font", {
    family: layoutStyles.vizText.fontFamily,
    size: layoutStyles.vizText.fontSize,
    color: layoutStyles.vizText.color,
  });

  setterIfNil(layout.yaxis, "fixedrange", true);

  setterIfNil(layout.yaxis, "ticks", "");
  setterIfNil(layout.yaxis, "tickfont", {
    family: layoutStyles.vizText.fontFamily,
    size: layoutStyles.vizText.fontSize,
    color: layoutStyles.vizText.color,
  });

  setterIfNil(layout.yaxis, "gridcolor", layoutStyles.gridColor);
  setterIfNil(layout.yaxis, "showgrid", !isHorizontal);
  setterIfNil(layout.yaxis, "showline", isHorizontal);

  setterIfNil(layout.yaxis, "linecolor", layoutStyles.lineColor);
  setterIfNil(layout.yaxis, "linewidth", 1);
  setterIfNil(layout.yaxis, "zeroline", false);

  if (yAxisTitle) {
    setterIfNil(layout, "yaxis", {});
    setterIfNil(layout.yaxis, "title", {});
    setterIfNil(layout.yaxis.title, "text", yAxisTitle);
  }

  return layout;
};

const applyLayoutXaxisDefaults = (inputLayout, layoutStyles, xAxisTitle, isHorizontal) => {
  const layout = inputLayout;
  setterIfNil(layout, "xaxis", {});

  setterIfNil(layout.xaxis, "automargin", true);

  setterIfNil(layout.xaxis, "title", {});
  setterIfNil(layout.xaxis.title, "font", {
    family: layoutStyles.vizText.fontFamily,
    size: layoutStyles.vizText.fontSize,
    color: layoutStyles.vizText.color,
  });

  setterIfNil(layout.xaxis, "fixedrange", true);

  setterIfNil(layout.xaxis, "ticks", "");
  setterIfNil(layout.xaxis, "tickfont", {
    family: layoutStyles.vizText.fontFamily,
    size: layoutStyles.vizText.fontSize,
    color: layoutStyles.vizText.color,
  });

  setterIfNil(layout.xaxis, "gridcolor", layoutStyles.gridColor);
  setterIfNil(layout.xaxis, "showgrid", isHorizontal);
  setterIfNil(layout.xaxis, "showline", !isHorizontal);

  setterIfNil(layout.xaxis, "linewidth", 1);
  setterIfNil(layout.xaxis, "linecolor", layoutStyles.lineColor);
  setterIfNil(layout.xaxis, "zeroline", false);

  if (xAxisTitle) {
    setterIfNil(layout, "xaxis", {});
    setterIfNil(layout.xaxis, "title", {});
    setterIfNil(layout.xaxis.title, "text", xAxisTitle);
  }
  return layout;
};

const applyLayoutLegendDefaults = (inputLayout, layoutStyles) => {
  const layout = inputLayout;

  setterIfNil(layout, "legend", {
    x: 0.5,
    y: 1.15,
    xanchor: "center",
    yanchor: "middle",
    orientation: "h",
  });

  setterIfNil(layout.legend, "font", {
    family: layoutStyles.legendText.fontFamily,
    size: layoutStyles.legendText.fontSize,
    color: layoutStyles.legendText.color,
  });
  return layout;
};

const applyLayoutRootDefaults = (inputLayout, layoutStyles) => {
  const layout = inputLayout;

  setterIfNil(layout, "colorway", Object.values(layoutStyles.defaultColors));

  setterIfNil(layout, "autosize", true);

  setterIfNil(layout, "margin", {
    l: 50,
    b: 50,
    t: 50,
    pad: 0,
  });

  setterIfNil(layout, "plot_bgcolor", layoutStyles.plotColor);
  setterIfNil(layout, "paper_bgcolor", layoutStyles.plotColor);
};

export const applyLayoutDefaults = (inputLayout, theme, isHorizontal, xAxisTitle, yAxisTitle) => {
  const layoutStyles = styles(theme);
  const layout = { ...inputLayout };

  // Layout
  applyLayoutRootDefaults(layout, layoutStyles);

  // Legend
  applyLayoutLegendDefaults(layout, layoutStyles);

  // Xaxis
  applyLayoutXaxisDefaults(layout, layoutStyles, xAxisTitle, isHorizontal);

  // Yaxis
  applyLayoutYaxisDefaults(layout, layoutStyles, yAxisTitle, isHorizontal);

  return layout;
};

export const applyConfigDefaults = (config) => ({
  responsive: true,
  displayModeBar: false,
  ...config,
});
