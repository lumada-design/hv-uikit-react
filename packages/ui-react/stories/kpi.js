import React from "react";
import { storiesOf } from "@storybook/react";
import { Typography } from "@material-ui/core";
import IconValid from "@hv-ui/icons/core/S-icons/Level0Success16Color";
import IconInvalid from "@hv-ui/icons/core/S-icons/Level5Unsuccess16Color";
import IconArrowUp from "./assets/arrow-green-up.svg";
import IconArrowDown from "./assets/arrow-red-down.svg";
import HvShowCase from "./utils/Showcase";
import HvShowCaseHeader from "./utils/ShowcaseHeader";
import HvKpi from "../src/Kpi";

const IOPSKpiTextConfiguration = {
  title: "Total IOPS",
  indicator: "113,277",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "0,15%"
};

const AverageKpiTextConfiguration = {
  title: "Avg. service time",
  indicator: "8.85",
  unit: "MS",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "10%"
};

const ThroughputKpiTextConfiguration = {
  title: "Total throughput",
  indicator: "16,699.82",
  unit: "MB/S",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "60%"
};

const StorageArrayKpiTextConfiguration = {
  title: "# of Storage arrays",
  indicator: "27",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "-5 units"
};

const separation = {
  margin: "80px",
  height: "300px"
};

const icon = () => <IconValid />;

const invalidIcon = () => <IconInvalid />;

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

storiesOf("Kpi", module).add("KPI", () => (
  <>
    <HvShowCaseHeader reviewed date="2018/Dec/28" />

    <HvShowCase title="Kpi of average service time" style={separation}>
      <HvKpi
        kpiTextConfiguration={AverageKpiTextConfiguration}
        visualIndicator={icon()}
        visualComparison={averageComparisonVisualAverage()}
      />
    </HvShowCase>

    <HvShowCase title="Kpi of Total throughput" style={separation}>
      <HvKpi
        kpiTextConfiguration={ThroughputKpiTextConfiguration}
        visualComparison={throughputComparisonVisual()}
      />
    </HvShowCase>

    <HvShowCase title="Kpi of Total IOPS" style={separation}>
      <HvKpi
        kpiTextConfiguration={IOPSKpiTextConfiguration}
        visualIndicator={invalidIcon()}
        visualComparison={IopsComparisonVisualAverage()}
      />
    </HvShowCase>

    <HvShowCase title="Kpi of storage" style={separation}>
      <HvKpi
        kpiTextConfiguration={StorageArrayKpiTextConfiguration}
        visualIndicator={invalidIcon()}
        visualComparison={StorageArrayComparisonVisual()}
      />
    </HvShowCase>
  </>
));
