import React from "react";
import Barchart from "@hv/uikit-react-core/dist/Barchart";

const trace1 = {
  x: ["January", "February", "March"],
  y: [2300, 1000, 8500],
  name: "Sales Target"
};

const data = [trace1];

export default (
  <div>
    <Barchart
      title="Simple Vertical Bar Chart"
      subtitle="Sales performance (YTD)"
      data={data}
      xAxisTitle="Thousands of Dollars ($)"
      yAxisTitle="Axis description"
    />
  </div>
);
