import React from "react";
import { Typography } from "@material-ui/core";
import IconInvalid from "@hv-ui/icons/core/S-icons/Level5Unsuccess16Color";
import IconArrowDown from "./assets/arrow-red-down.svg";
import HvKpi from "@hv-ui/react/core/Kpi";

const IOPSKpiTextConfiguration = {
  title: "Total IOPS",
  indicator: "113,277",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "0,15%"
};

const IopsComparisonVisualAverage = () => (
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
        background: `url(${IconArrowDown}) no-repeat`
      }}
      color="#008000"
    />
    <Typography
      style={{
        color: "#D13F3F",
        position: "relative",
        paddingLeft: "16px",
        fontSize: "14px",
        fontWeight: "600",
        paddingBottom: "2px"
      }}
    >
      {IOPSKpiTextConfiguration.comparisonIndicator}
    </Typography>
  </div>
);

const invalidIcon = () => <IconInvalid />;

export default (
  <HvKpi
    kpiTextConfiguration={IOPSKpiTextConfiguration}
    visualIndicator={invalidIcon()}
    visualComparison={IopsComparisonVisualAverage()}
  />
);
