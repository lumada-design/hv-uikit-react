import React from "react";
import Linechart from "@hv/uikit-react-core/dist/Linechart";

const trace1 = {
  x: ["January", "February", "March"],
  y: [2300, 1000, 8500],
  name: "Sales Target"
};
const data = [trace1];

export default (
  <div>
    <Linechart
      title="Simple Vertical Bar Chart"
      subtitle="Sales performance (YTD)"
      data={data}
      type="area"
      xAxisTitle="2018"
      yAxisTitle="Thousands of Dollars ($)"
    />
  </div>
);
