import React from "react";
import Linechart from "@hv/uikit-react-core/dist/Linechart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const trace1 = {
  x: months,
  y: [3400, 5929, 1803, 6470, 6853, 7517, 5636, 4280, 7238, 6889, 8268, 2751],
  name: "Sales Target"
};

const trace2 = {
  x: months,
  y: [3022, 3005, 2517, 8397, 6587, 6648, 8067, 2723, 7523, 7853, 4819, 3820],
  name: "Sales Per Rep"
};

const trace3 = {
  x: months,
  y: [3900, 4971, 2694, 2177, 7756, 1717, 3308, 2200, 2294, 1771, 2324, 6705],
  name: "Monthly Sales"
};

const data = [trace1, trace2, trace3];

export default (
  <Linechart
    title="Multiple lines"
    subtitle="Sales performance (YTD)"
    data={data}
    xAxisTitle="2018"
    yAxisTitle="Thousands of Dollars ($)"
  />
);
