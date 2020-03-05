import React from "react";
import Barchart from "@hv/uikit-react-core/dist/Barchart";

const data = [
  {
    x: [2300, 1000, 8500],
    y: ["January", "February", "March"],
    name: "Sales Target"
  }
];

export default (
  <Barchart
    title="Simple Horizontal Bar Chart"
    subtitle="Sales performance (YTD)"
    data={data}
    tooltipType="single"
    horizontal
    xAxisTitle="Thousands of Dollars ($)"
    yAxisTitle="2018"
  />
);
