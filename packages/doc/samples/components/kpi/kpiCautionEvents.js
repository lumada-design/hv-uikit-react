import React from "react";
import Chart from "react-google-charts";
import { HvCard, HvKpi, HvTypography } from "@hv/uikit-react-core/dist";
import { Level3Bad } from "@hv/uikit-react-icons/dist";

const labels = {
  title: "Caution events",
  indicator: "222",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "0,37%"
};

const IopsComparisonVisualAverage = () => (
  <div style={{ position: "relative" }}>
    <HvTypography style={{ position: "relative" }} variant="highlightText">
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
      top: "4px",
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
        ["2014", 1170],
        ["2015", 760],
        ["2016", 2890]
      ]}
      options={{
        legend: "none",
        colors: ["#E68C17"],
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
      visualIndicator={<Level3Bad semantic="sema13" />}
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
      semantic="sema13"
    />
  </div>
);
