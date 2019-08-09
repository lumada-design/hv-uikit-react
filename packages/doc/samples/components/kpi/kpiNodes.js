import React from "react";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";

const labels = {
  title: "Nodes",
  indicator: "34 677",
  unit: "",
  comparisonIndicatorInfo: "",
  comparisonIndicator: ""
};

export default (
  <HvKpi
    labels={labels}
    visualComparison={labels.comparisonIndicator}
  />
);
