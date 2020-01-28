import React from "react";
import Chart from "react-google-charts";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import HvCard from "@hv/uikit-react-core/dist/Card";
import ArrowDown from "@hv/uikit-react-icons/dist/Generic/BottomXS";

const labels = {
  title: "Total number of events",
  indicator: "508K",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "82,05%"
};

const IopsComparisonVisualAverage = () => (
  <div
    style={{
      position: "relative"
    }}
  >
    <ArrowDown
      style={{
        position: "absolute",
        top: "16px",
        left: "-1px"
      }}
      semantic="sema1"
    />
    <HvTypography
      style={{
        position: "relative",
        paddingLeft: "16px"
      }}
      variant="highlightText"
    >
      {labels.comparisonIndicator}
    </HvTypography>
  </div>
);

const trend = () => (
  <div
    style={{
      width: "32px",
      height: "32px",
      position: "relative",
      left: "-8px",
      top: "10px",
      pointerEvents: "none"
    }}
  >
    <Chart
      width={"50px"}
      height={"32px"}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Year", "Sales"],
        ["2013", 2500],
        ["2014", 2170],
        ["2015", 760],
        ["2016", 630],
        ["2017", 130]
      ]}
      options={{
        legend: "none",
        colors: ["green"],
        tooltip: {
          trigger: "none"
        },
        hAxis: {
          minValue: 0,
          maxValue: 10,
          gridlines: {
            color: "transparent"
          },
          baselineColor: "transparent"
        },
        backgroundColor: "transparent",
        vAxis: {
          gridlines: {
            color: "transparent"
          },
          baselineColor: "transparent"
        }
      }}
    />
  </div>
);

const kpiContainer = {
  paddingTop: "20px"
};

const KpiT = () => (
  <div style={kpiContainer}>
    <HvKpi
      labels={labels}
      trendIndicator={trend()}
      visualComparison={IopsComparisonVisualAverage()}
    />
  </div>
);

export default (
  <div style={{ width: "190px" }}>
    <HvCard
      id="test"
      innerCardContent={<KpiT />}
      noFooter
      noHeader
      isSelectable
      selectOnClickAction
      semantic="sema0"
    />
  </div>
);
