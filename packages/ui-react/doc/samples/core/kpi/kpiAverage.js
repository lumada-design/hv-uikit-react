import React from "react";
import { Typography } from "@material-ui/core";
import IconValid from "@hv-ui/icons/core/S-icons/Level0Success16Color";
import IconArrowUp from "./assets/arrow-green-up.svg";
import HvKpi from "@hv-ui/react/core/Kpi";

const AverageKpiTextConfiguration = {
  title: "Avg. service time",
  indicator: "8.85",
  unit: "MS",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "10%"
};

const averageComparisonVisualAverage = () => (
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
      {AverageKpiTextConfiguration.comparisonIndicator}
    </Typography>
  </div>
);

const icon = () => <IconValid />;

export default (
  <HvKpi
    kpiTextConfiguration={AverageKpiTextConfiguration}
    visualIndicator={icon()}
    visualComparison={averageComparisonVisualAverage()}
  />
);
