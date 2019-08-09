import React from "react";
import Barchart from "@hv/uikit-react-core/dist/Barchart";

const trace1 = {
  y: ["Group one", "Group two", "Group three"],
  x: [2300, 1000, 8500],
  name: "Sales Target"
};

const trace2 = {
  y: ["Group one", "Group two", "Group three"],
  x: [6000, 3900, 1000],
  name: "Sales Per Rep"
};

const trace3 = {
  y: ["Group one", "Group two", "Group three"],
  x: [3700, 7500, 1100],
  name: "Monthly Sales"
};

const trace4 = {
  y: ["Group one", "Group two", "Group three"],
  x: [2100, 8500, 3000],
  name: "Target"
};

const trace5 = {
  y: ["Group one", "Group two", "Group three"],
  x: [500, 8000, 9500],
  name: "Cash"
};

const data = [trace1, trace2, trace3, trace4, trace5];

export default (
  <Barchart
    title="Stacked Horizontal Bar Chart"
    subtitle="Sales performance (YTD)"
    data={data}
    stack
    horizontal
    xAxisTitle="Thousands of Dollars ($)"
    yAxisTitle="Axis description"
  />
);
