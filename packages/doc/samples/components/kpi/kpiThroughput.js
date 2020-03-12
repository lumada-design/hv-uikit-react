import React from "react";
import { HvKpi, HvTypography } from "@hv/uikit-react-core/dist";
import { Level0Good as Success, UpXS as ArrowUp } from "@hv/uikit-react-icons/dist";

const labels = {
  title: "Total throughput",
  indicator: "16,699.82",
  unit: "MB/S",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "60%"
};

const ThroughputComparisonVisual = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <ArrowUp boxStyles={{ width: "20px", height: "20px" }} semantic="sema1" />
    <HvTypography component="span" variant="highlightText">
      {labels.comparisonIndicator}
    </HvTypography>
  </div>
);

const kpiContainer = {
  minWidth: "190px",
  padding: "20px"
};

export default (
  <div style={kpiContainer}>
    <HvKpi
      labels={labels}
      visualIndicator={<Success semantic="sema1" />}
      visualComparison={<ThroughputComparisonVisual />}
    />
  </div>
);
