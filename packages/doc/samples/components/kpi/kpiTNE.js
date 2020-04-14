import React from "react";
import Chart from "react-google-charts";
import { HvCard, HvKpi, HvTypography } from "@hv/uikit-react-core/dist";
import { Level2Average as Average, BottomXS as ArrowDown } from "@hv/uikit-react-icons/dist";

const labels = {
  title: "Total number of events",
  indicator: "508K",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "82,05%"
};

const IopsComparisonVisualAverage = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <ArrowDown boxStyles={{ width: "20px", height: "20px" }} semantic="sema4" />
    <HvTypography component="span" variant="highlightText">
      {labels.comparisonIndicator}
    </HvTypography>
  </div>
);

const TrendIndicator = () => (
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
      width="50px"
      height="32px"
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Year", "Sales"],
        ["2013", 3000],
        ["2014", 2170],
        ["2015", 760],
        ["2016", 630]
      ]}
      options={{
        legend: "none",
        colors: ["red"],
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
      visualIndicator={<Average semantic="sema4" />}
      trendIndicator={<TrendIndicator />}
      visualComparison={<IopsComparisonVisualAverage />}
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
      semantic="sema4"
    />
  </div>
);
