import React, { useState } from "react";
import Chart from "react-google-charts";
import { TopXS, BottomXS, Level0Good, Level2Average } from "@hv/uikit-react-icons";
import { HvKpi, HvTypography, HvCard } from "../..";

export default {
  title: "Visualizations/KPI",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvKpi } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvKpi,
  decorators: [
    (Story) => (
      <div style={{ margin: 20 }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => (
  <>
    <HvTypography variant="highlightText">Title</HvTypography>
    <div style={{ display: "inline-flex", alignItems: "flex-end" }}>
      <HvTypography style={{ marginRight: 10 }} variant="lTitle">
        9.99
      </HvTypography>
      <HvTypography style={{ paddingBottom: 3 }} variant="sTitle">
        Units
      </HvTypography>
    </div>
  </>
);

export const AverageService = () => (
  <HvCard
    style={{ width: 320 }}
    semantic="sema1"
    icon={<Level0Good title="Good" semantic="sema1" />}
  >
    <HvTypography style={{ padding: 15 }} variant="xsTitle">
      Avg. service time
    </HvTypography>
    <div style={{ display: "flex", alignItems: "center", padding: "0 15px" }}>
      <HvTypography style={{ marginRight: 10 }} variant="lTitle">
        12 414
      </HvTypography>
      <TopXS title="Up" semantic="sema1" />
      <HvTypography component="span" variant="highlightText">
        10%
      </HvTypography>
    </div>
  </HvCard>
);

AverageService.parameters = {
  docs: {
    description: { story: "A kpi showing the average service time." },
  },
};

export const IOPS = () => {
  const [selected, setSelected] = useState(false);

  const TrendIndicator = () => (
    <div style={{ pointerEvents: "none", marginRight: -4 }}>
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
          ["2016", 630],
        ]}
        options={{
          legend: "none",
          colors: ["red"],
          tooltip: {
            trigger: "none",
          },
          hAxis: {
            minValue: 0,
            maxValue: 10,
            gridlines: {
              color: "transparent",
            },
            baselineColor: "transparent",
          },
          backgroundColor: "transparent",
          vAxis: {
            gridlines: {
              color: "transparent",
            },
            baselineColor: "transparent",
          },
        }}
      />
    </div>
  );

  return (
    <HvCard
      selectable
      selected={selected}
      onClick={() => setSelected(!selected)}
      bgcolor="atmo1"
      style={{ width: 320, cursor: "pointer" }}
      semantic="sema4"
      icon={<Level2Average title="Bad" semantic="sema4" />}
    >
      <HvTypography style={{ padding: 15 }} variant="xsTitle">
        Total IOPS
      </HvTypography>
      <div style={{ display: "flex", alignItems: "center", padding: "0 20px 15px" }}>
        <HvTypography style={{ marginRight: 10 }} variant="lTitle">
          113 277
        </HvTypography>
        <TrendIndicator />
        <BottomXS title="Down" semantic="sema4" />
        <div>
          <HvTypography variant="highlightText">0,15%</HvTypography>
          <HvTypography variant="normalText">vs last 24h.</HvTypography>
        </div>
      </div>
    </HvCard>
  );
};

IOPS.parameters = {
  docs: {
    description: { story: "A Kpi sample showcasing the total IOPS." },
  },
  eyes: {
    // waiting until external charts are rendered (issue #1792)
    waitBeforeCapture: "[id|=reactgooglegraph]",
  },
};

export const StorageArray = () => (
  <>
    <HvTypography variant="highlightText"># of Storage arrays</HvTypography>
    <div style={{ display: "inline-flex", alignItems: "flex-end" }}>
      <HvTypography style={{ marginRight: 10 }} variant="lTitle">
        27
      </HvTypography>
    </div>
    <HvTypography variant="highlightText">-5 units</HvTypography>
    <HvTypography variant="vizText">vs last 24h.</HvTypography>
  </>
);

export const Selectable = () => {
  const [selected, setSelected] = useState(false);

  const TrendIndicator = () => (
    <div style={{ pointerEvents: "none" }}>
      <Chart
        width="50px"
        height="32px"
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Year", "Sales"],
          ["2013", 2500],
          ["2014", 2170],
          ["2015", 760],
          ["2016", 630],
          ["2017", 130],
        ]}
        options={{
          legend: "none",
          colors: ["green"],
          tooltip: {
            trigger: "none",
          },
          hAxis: {
            minValue: 0,
            maxValue: 10,
            gridlines: {
              color: "transparent",
            },
            baselineColor: "transparent",
          },
          backgroundColor: "transparent",
          vAxis: {
            gridlines: {
              color: "transparent",
            },
            baselineColor: "transparent",
          },
        }}
      />
    </div>
  );

  return (
    <HvCard
      id="test"
      selectable
      selected={selected}
      onClick={() => setSelected(!selected)}
      semantic="sema0"
      style={{ width: 190, cursor: "pointer" }}
    >
      <div style={{ padding: 20 }}>
        <HvTypography variant="highlightText">Total number of events</HvTypography>
        <HvTypography variant="lTitle" style={{ margin: "10px 0" }}>
          508K
        </HvTypography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TrendIndicator />
          <TopXS title="Up" semantic="sema1" />
          <div>
            <HvTypography component="span" variant="highlightText">
              82,05%
            </HvTypography>
            <HvTypography variant="vizText">vs last 24h.</HvTypography>
          </div>
        </div>
      </div>
    </HvCard>
  );
};

Selectable.parameters = {
  docs: {
    description: { story: "A selectable kpi with the total numbers of event." },
  },
  eyes: {
    // waiting until external charts are rendered (issue #1792)
    waitBeforeCapture: "[id|=reactgooglegraph]",
  },
};

export const SelectableSemantic = () => {
  const [selected, setSelected] = useState(false);

  const TrendIndicator = () => (
    <div style={{ pointerEvents: "none" }}>
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
          ["2016", 630],
        ]}
        options={{
          legend: "none",
          colors: ["red"],
          tooltip: {
            trigger: "none",
          },
          hAxis: {
            minValue: 0,
            maxValue: 10,
            gridlines: {
              color: "transparent",
            },
            baselineColor: "transparent",
          },
          backgroundColor: "transparent",
          vAxis: {
            gridlines: {
              color: "transparent",
            },
            baselineColor: "transparent",
          },
        }}
      />
    </div>
  );

  return (
    <HvCard
      id="test"
      selectable
      selected={selected}
      onClick={() => setSelected(!selected)}
      semantic="sema4"
      style={{ width: 190, cursor: "pointer" }}
    >
      <div style={{ padding: 20 }}>
        <HvTypography variant="highlightText">Total number of events</HvTypography>
        <HvTypography variant="lTitle" style={{ margin: "10px 0" }}>
          508K
        </HvTypography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TrendIndicator />
          <BottomXS title="Down" semantic="sema4" />
          <div>
            <HvTypography component="span" variant="highlightText">
              82,05%
            </HvTypography>
            <HvTypography variant="vizText">vs last 24h.</HvTypography>
          </div>
        </div>
      </div>
    </HvCard>
  );
};

SelectableSemantic.parameters = {
  docs: {
    description: { story: "A selectable kpi with the total numbers of event." },
  },
  eyes: {
    // waiting until external charts are rendered (issue #1792)
    waitBeforeCapture: "[id|=reactgooglegraph]",
  },
};
