/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Set the property if it is null.
 * @param object
 * @param property
 * @param value
 */
const setterIfNil = (object, property, value) => {
  // eslint-disable-next-line no-param-reassign
  object[property] = object[property] || value;
};

/**
 * Auxiliary functions to set the layout in order to follow the DS guideline.
 *
 */

export const setYaxis = (inputLayout, styles, isHorizontal, yAxisTitle) => {
  const layout = inputLayout;

  setterIfNil(layout, "yaxis", {});

  setterIfNil(layout.yaxis, "automargin", true);

  setterIfNil(layout.yaxis, "title", {});

  setterIfNil(layout.yaxis.title, "font", {
    family: styles.vizText.fontFamily,
    size: styles.vizText.fontSize,
    color: styles.vizText.color
  });

  setterIfNil(layout.yaxis, "fixedrange", true);

  setterIfNil(layout.yaxis, "tickcolor", styles.lineColor);
  setterIfNil(layout.yaxis, "ticklen", 2);
  setterIfNil(layout.yaxis, "tickfont", {
    family: styles.vizText.fontFamily,
    size: styles.vizText.fontSize,
    color: styles.vizText.color
  });

  setterIfNil(layout.yaxis, "gridcolor", styles.gridColor);
  setterIfNil(layout.yaxis, "showgrid", !isHorizontal);

  setterIfNil(layout.yaxis, "linecolor", styles.lineColor);
  setterIfNil(layout.yaxis, "linewidth", 1);
  setterIfNil(layout.yaxis, "zeroline", false);

  if (yAxisTitle) {
    setterIfNil(layout, "yaxis", {});
    setterIfNil(layout.yaxis, "title", {});
    setterIfNil(layout.yaxis.title, "text", yAxisTitle);
  }

  return layout;
};

export const setXaxis = (inputLayout, styles, xAxisTitle, isHorizontal) => {
  const layout = inputLayout;
  setterIfNil(layout, "xaxis", {});

  setterIfNil(layout.xaxis, "automargin", true);

  setterIfNil(layout.xaxis, "title", {});

  setterIfNil(layout.xaxis.title, "font", {
    family: styles.vizText.fontFamily,
    size: styles.vizText.fontSize,
    color: styles.vizText.color
  });

  setterIfNil(layout.xaxis, "fixedrange", true);

  setterIfNil(layout.xaxis, "tickcolor", styles.lineColor);
  setterIfNil(layout.xaxis, "ticklen", 2);
  setterIfNil(layout.xaxis, "tickfont", {
    family: styles.vizText.fontFamily,
    size: styles.vizText.fontSize,
    color: styles.vizText.color
  });

  setterIfNil(layout.xaxis, "gridcolor", styles.gridColor);
  setterIfNil(layout.xaxis, "showgrid", isHorizontal);

  setterIfNil(layout.xaxis, "linewidth", 1);
  setterIfNil(layout.xaxis, "linecolor", styles.lineColor);
  setterIfNil(layout.xaxis, "zeroline", false);

  if (xAxisTitle) {
    setterIfNil(layout, "xaxis", {});
    setterIfNil(layout.xaxis, "title", {});
    setterIfNil(layout.xaxis.title, "text", xAxisTitle);
  }
  return layout;
};

export const setLegend = (inputLayout, styles) => {
  const layout = inputLayout;
  setterIfNil(layout, "legend", {
    x: 1,
    y: 1.1,
    xanchor: "right",
    yanchor: "bottom",
    orientation: "h"
  });

  setterIfNil(layout.legend, "font", {
    family: styles.vizText.fontFamily,
    size: styles.vizText.fontSize,
    color: styles.vizText.color
  });
  return layout;
};

export const setLayout = (inputLayout, styles) => {
  const layout = inputLayout;

  setterIfNil(layout, "colorway", Object.values(styles.defaultColors));

  setterIfNil(layout, "autosize", true);

  setterIfNil(layout, "margin", {
    l: 50,
    b: 50,
    t: 10,
    pad: 0
  });

  setterIfNil(layout, "plot_bgcolor", styles.plotColor);

  setterIfNil(layout, "paper_bgcolor", styles.plotColor);
};
