import React from "react";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";

const labels = {
  title: "# of Storage arrays",
  indicator: "27",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "-5 units"
};

const kpiContainer = {
  minWidth: "190px",
  padding: "20px"
}

export default (
  <div style={kpiContainer}>
    <HvKpi
      labels={labels}
      visualComparison={labels.comparisonIndicator}
    />
  </div>
);
