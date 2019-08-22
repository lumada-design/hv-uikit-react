import React from "react";
import Barchart from "@hv/uikit-react-core/dist/Barchart";

const trace1 = {
  x: [2300, 1000, 8500],
  y: ["January", "February", "March"],
  name: "Sales Target"
};

const data = [trace1];

export default (
  <Barchart
    title="Simple Horizontal Bar Chart"
    subtitle="Sales performance (YTD)"
    data={data}
    horizontal
    xAxisTitle="Thousands of Dollars ($)"
    yAxisTitle="2018"
  />
);
