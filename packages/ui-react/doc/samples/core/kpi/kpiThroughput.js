import React from "react";
import { Typography } from "@material-ui/core";
import IconValid from "@hv-ui/icons/core/S-icons/Level0Success16Color";
import IconArrowUp from "./assets/arrow-green-up.svg";
import HvKpi from "@hv-ui/react/core/Kpi";

const ThroughputKpiTextConfiguration = {
  title: "Total throughput",
  indicator: "16,699.82",
  unit: "MB/S",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "60%"
};

const throughputComparisonVisual = () => (
  <div
    style={{
      position: "relative"
    }}
  >
    <div
      style={{
        color: "#008000",
        position: "absolute",
        width: "32px",
        height: "32px",
        top: "1px",
        left: "-3px",
        background: `url(${IconArrowUp}) no-repeat`
      }}
      color="#008000"
    />
    <Typography
      style={{
        color: "#63A621",
        position: "relative",
        paddingLeft: "16px",
        fontSize: "14px",
        fontWeight: "600",
        paddingBottom: "2px"
      }}
    >
      {ThroughputKpiTextConfiguration.comparisonIndicator}
    </Typography>
  </div>
);

const icon = () => <IconValid />;

export default (
  <HvKpi
    kpiTextConfiguration={ThroughputKpiTextConfiguration}
    visualIndicator={icon()}
    visualComparison={throughputComparisonVisual()}
  />
);
