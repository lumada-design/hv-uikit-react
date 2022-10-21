/* eslint-disable no-param-reassign */
import clone from "lodash/cloneDeep";

const HEX_ALPHA_50 = "80";
const HEIGHT_PER_CATEGORY = 45;
const WIDTH_PER_CATEGORY = 55;

const setterIfNil = (object, property, value) => {
  object[property] = object[property] ?? value;
};

const buildAnnotations = (trace, customAnnotations, deltaMatrix = false) => {
  const { x = [], y = [], z = [] } = trace;
  const annotations = [];
  for (let i = 0; i < y.length; i += 1) {
    for (let j = 0; j < x.length; j += 1) {
      const currentValue = z[i][j];
      let textValue;
      let size = 12;
      if (currentValue > 999) {
        textValue = currentValue.toExponential(1);
      } else {
        textValue = currentValue;
      }

      if (deltaMatrix) {
        if (i !== j) {
          textValue = 0 - textValue;
        } else {
          textValue = `<span style="font-weight: 600;">${textValue}</span>`;
          size = 14;
        }
      }

      const result = {
        xref: "x1",
        yref: "y1",
        x: x[j],
        y: y[i],
        text: customAnnotations?.text?.(currentValue) ?? textValue,
        font: {
          family: "Open Sans",
          size: customAnnotations?.size ?? size,
          color: customAnnotations?.textColor,
        },
        showarrow: false,
      };
      annotations.push(result);
    }
  }

  return annotations;
};

/**
 * Auxiliary functions to set the layout in order to follow the DS guideline.
 */
export const applyLayoutDefaults = (inputLayout = {}, theme, data = [{}], deltaMatrix) => {
  const layout = clone(inputLayout);
  setterIfNil(layout, "hovermode", "closest");
  const [trace] = data;

  const categories = trace?.x || [];
  const squareWidth = categories.length * WIDTH_PER_CATEGORY;
  const squareHeight = categories.length * HEIGHT_PER_CATEGORY;
  const chartWidth = Math.max(squareWidth, WIDTH_PER_CATEGORY * 10);
  const chartHeight = Math.max(squareHeight, WIDTH_PER_CATEGORY * 10);
  setterIfNil(layout, "width", chartWidth);
  setterIfNil(layout, "height", chartHeight);
  setterIfNil(layout, "margin", {
    t: 130,
    b: 40,
    pad: 10,
  });

  const textColor = theme?.hv?.palette?.accent?.acce1 || "black";

  const getAxisLayout = (text, standoff) => ({
    color: textColor,
    showline: false,
    showgrid: false,
    tickfont: {
      family: "Open Sans",
      size: 12,
    },
    ticks: "",
    title: {
      text,
      standoff,
      font: {
        family: "Open Sans",
        size: 12,
      },
    },
  });
  setterIfNil(layout, "yaxis", {
    ...getAxisLayout("True Label", 50),
    autorange: "reversed",
  });
  setterIfNil(layout, "xaxis", {
    ...getAxisLayout("Predicted Label", 15),
    side: "top",
    tickangle: "-45",
  });

  const backgroundColor = theme?.hv?.palette?.atmosphere?.atmo1 || "white";
  setterIfNil(layout, "paper_bgcolor", backgroundColor);
  setterIfNil(layout, "plot_bgcolor", backgroundColor);

  setterIfNil(
    layout,
    "annotations",
    buildAnnotations(trace, { textColor, ...(layout.customAnnotations || {}) }, deltaMatrix)
  );

  return layout;
};

const calculateDeltaMatrix = (matrix1, matrix2) => {
  let deltaMin = 0;
  const matrixData = matrix1.reduce((lineAcc, classLine, lineIndex) => {
    const lineValues = classLine.reduce((columnAcc, columnValue, columnIndex) => {
      let value = columnValue - matrix2[lineIndex][columnIndex];
      deltaMin = Math.min(deltaMin, value);
      if (lineIndex !== columnIndex) {
        value = 0 - value;
      }
      return [...columnAcc, value];
    }, []);
    return [...lineAcc, lineValues];
  }, []);

  return [matrixData, deltaMin];
};

export const applyDataDefaults = (inputData = [{}], theme, deltaMatrix) => {
  const data = clone(inputData);
  const backgroundColor = theme?.hv?.palette?.atmosphere?.atmo1 || "white";
  const greenColor = theme?.hv?.viz?.palette?.polarized?.cviz21 || "#008000";
  const redColor = theme?.hv?.viz?.palette?.polarized?.cviz26 || "#FF0000";

  data.forEach((trace) => {
    setterIfNil(trace, "type", "heatmap");
    setterIfNil(trace, "hoverinfo", "none");

    const colorscale = [
      [0, backgroundColor],
      [1, `${greenColor}${HEX_ALPHA_50}`],
    ];
    const deltaColorscale = [
      [0, `${redColor}${HEX_ALPHA_50}`],
      [0.5, backgroundColor],
      [1, `${greenColor}${HEX_ALPHA_50}`],
    ];

    setterIfNil(trace, "colorscale", deltaMatrix ? deltaColorscale : colorscale);
    setterIfNil(trace, "showscale", false);

    const [matrixData, deltaMin] = deltaMatrix
      ? calculateDeltaMatrix(trace.z, deltaMatrix)
      : [trace.z];
    trace.z = matrixData;

    if (deltaMatrix) {
      const getMax = (matrix) => {
        const max = Math.max(...matrix.flat());
        return max < 0 ? Math.abs(deltaMin) : max;
      };

      setterIfNil(trace, "zmin", deltaMin);
      setterIfNil(trace, "zmid", 0);
      setterIfNil(trace, "zmax", getMax(matrixData));
    }
  });

  return data;
};
