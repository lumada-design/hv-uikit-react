import React from "react";
import HvKpi from "@hv-ui/react/core/Kpi";

const AverageKpiTextConfiguration = {
  title: "Title",
  indicator: "9.99",
  unit: "Units",
  comparisonIndicatorInfo: "info comparison",
  comparisonIndicator: "99%"
};

export default <HvKpi kpiTextConfiguration={AverageKpiTextConfiguration} />;
