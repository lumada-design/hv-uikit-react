import React from "react";
import { Typography } from "@material-ui/core";
import IconInvalid from "@hv-ui/icons/core/S-icons/Level5Unsuccess16Color";
import HvKpi from "@hv-ui/react/core/Kpi";

const StorageArrayKpiTextConfiguration = {
  title: "# of Storage arrays",
  indicator: "27",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "-5 units"
};

const StorageArrayComparisonVisual = () => (
  <div
    style={{
      position: "relative"
    }}
  >
    <Typography
      style={{
        position: "relative",
        fontSize: "14px",
        fontWeight: "600",
        paddingBottom: "2px"
      }}
    >
      {StorageArrayKpiTextConfiguration.comparisonIndicator}
    </Typography>
  </div>
);

const invalidIcon = () => <IconInvalid />;

export default (
  <HvKpi
    kpiTextConfiguration={StorageArrayKpiTextConfiguration}
    visualIndicator={invalidIcon()}
    visualComparison={StorageArrayComparisonVisual()}
  />
);
