import React from "react";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";

const AverageKpiTextConfiguration = {
  title: "Title",
  indicator: "9.99",
  unit: "Units",
  comparisonIndicatorInfo: "info comparison",
  comparisonIndicator: "99%"
};

export default <HvKpi labels={AverageKpiTextConfiguration} id="test"/>;
