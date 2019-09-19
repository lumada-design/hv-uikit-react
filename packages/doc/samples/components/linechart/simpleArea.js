import React from "react";
import Linechart from "@hv/uikit-react-core/dist/Linechart";

const trace1 = {
  x: [
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
  ],
  y: [5929, 2393, 1590, 7817, 4749, 1702, 2381, 2909, 6732, 3098, 2119, 2146],
  name: "Sales Target"
};
const data = [trace1];

export default (
  <Linechart
    title="Simple line with area"
    subtitle="Sales performance (YTD)"
    data={data}
    type="area"
    xAxisTitle="2018"
    yAxisTitle="Thousands of Dollars ($)"
  />
);
