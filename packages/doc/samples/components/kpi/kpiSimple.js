import React from "react";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";

const AverageKpiTextConfiguration = {
  title: "Title",
  indicator: "9.99",
  unit: "Units",
  comparisonIndicatorInfo: "info comparison",
  comparisonIndicator: "99%"
};

const kpiContainer = {
  minWidth: "190px",
  padding: "20px"
};

export default (
  <div style={kpiContainer}>
    <HvKpi labels={AverageKpiTextConfiguration} id="test" />
  </div>
);
