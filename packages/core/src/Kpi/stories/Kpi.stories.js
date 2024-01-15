import React from "react";
import Chart from "react-google-charts";
import {
  Level0Good as Success,
  UpXS as ArrowUp,
  Level2Average as Average,
  BottomXS as ArrowDown,
  Level3Bad,
} from "@hitachivantara/uikit-react-icons";
import { HvKpi, HvTypography, HvCard } from "../..";

export default {
  title: "Visualizations/KPI",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvKpi } from "@hitachivantara/uikit-react-core";',
  },
  component: HvKpi,
};

export const Main = () => {
  const AverageKpiTextConfiguration = {
    title: "Title",
    indicator: "9.99",
    unit: "Units",
    comparisonIndicatorInfo: "info comparison",
    comparisonIndicator: "99%",
  };

  const kpiContainer = {
    minWidth: "190px",
    padding: "20px",
  };

  return (
    <div style={kpiContainer}>
      <HvKpi labels={AverageKpiTextConfiguration} id="test-kpi" />
    </div>
  );
};

export const AverageService = () => {
  const labels = {
    title: "Avg. service time",
    indicator: "124 14",
    unit: "",
    comparisonIndicatorInfo: "vs last 24h.",
    comparisonIndicator: "10%",
  };

  const KpiVisualAverage = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ArrowUp title="Up" boxStyles={{ width: "16px", height: "16px" }} semantic="sema1" />
      <HvTypography component="span" variant="highlightText">
        {labels.comparisonIndicator}
      </HvTypography>
    </div>
  );

  const kpiContainer = {
    minWidth: "190px",
    padding: "20px",
  };

  return (
    <div style={kpiContainer}>
      <HvKpi
        labels={labels}
        visualIndicator={<Success title="Good" semantic="sema1" />}
        visualComparison={<KpiVisualAverage />}
      />
    </div>
  );
};

AverageService.story = {
  parameters: {
    docs: {
      storyDescription: "A kpi showing the average service time.",
    },
  },
};

export const Iops = () => {
  const labels = {
    title: "Total IOPS",
    indicator: "113 277",
    unit: "",
    comparisonIndicatorInfo: "vs last 24h.",
    comparisonIndicator: "0,15%",
  };

  const IopsComparisonVisualAverage = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ArrowDown title="Down" boxStyles={{ width: "20px", height: "20px" }} semantic="sema4" />
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
        pointerEvents: "none",
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

  const kpiContainer = {
    minWidth: "190px",
    padding: "20px",
  };

  return (
    <div style={kpiContainer}>
      <HvKpi
        labels={labels}
        visualIndicator={<Average title="Bad" semantic="sema4" />}
        trendIndicator={<TrendIndicator />}
        visualComparison={<IopsComparisonVisualAverage />}
      />
    </div>
  );
};

Iops.story = {
  parameters: {
    docs: {
      storyDescription: "A Kpi sample showcasing the total IOPS.",
    },
    eyes: {
      // waiting until external charts are rendered (issue #1792)
      waitBeforeScreenshot: "[id|=reactgooglegraph]",
    },
  },
};

export const TotalThroughput = () => {
  const labels = {
    title: "Total throughput",
    indicator: "16,699.82",
    unit: "MB/S",
    comparisonIndicatorInfo: "vs last 24h.",
    comparisonIndicator: "60%",
  };

  const ThroughputComparisonVisual = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ArrowUp title="Up" boxStyles={{ width: "20px", height: "20px" }} semantic="sema1" />
      <HvTypography component="span" variant="highlightText">
        {labels.comparisonIndicator}
      </HvTypography>
    </div>
  );

  const kpiContainer = {
    minWidth: "190px",
    padding: "20px",
  };

  return (
    <div style={kpiContainer}>
      <HvKpi
        labels={labels}
        visualIndicator={<Success title="Good" semantic="sema1" />}
        visualComparison={<ThroughputComparisonVisual />}
      />
    </div>
  );
};

TotalThroughput.story = {
  parameters: {
    docs: {
      storyDescription: "A kpi showing the throughput.",
    },
  },
};

export const StorageArray = () => {
  const labels = {
    title: "# of Storage arrays",
    indicator: "27",
    unit: "",
    comparisonIndicatorInfo: "vs last 24h.",
    comparisonIndicator: "-5 units",
  };

  const kpiContainer = {
    minWidth: "190px",
    padding: "20px",
  };

  return (
    <div style={kpiContainer}>
      <HvKpi labels={labels} visualComparison={labels.comparisonIndicator} />
    </div>
  );
};

StorageArray.story = {
  parameters: {
    docs: {
      storyDescription: "A kpi showing the throughput.",
    },
  },
};

export const Nodes = () => {
  const labels = {
    title: "Nodes",
    indicator: "34 677",
  };

  const kpiContainer = {
    minWidth: "190px",
    padding: "20px",
  };

  return (
    <div style={kpiContainer}>
      <HvKpi labels={labels} />
    </div>
  );
};

Nodes.story = {
  parameters: {
    docs: {
      storyDescription: "A kpi showing the number of nodes.",
    },
  },
};

export const Selectable = () => {
  const labels = {
    title: "Total number of events",
    indicator: "508K",
    unit: "",
    comparisonIndicatorInfo: "vs last 24h.",
    comparisonIndicator: "82,05%",
  };

  const IopsComparisonVisualAverage = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ArrowUp title="Up" boxStyles={{ width: "16px", height: "16px" }} semantic="sema1" />
      <HvTypography component="span" variant="highlightText">
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
        pointerEvents: "none",
      }}
    >
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

  const kpiContainer = {
    paddingTop: "20px",
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

  return (
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
};

Selectable.story = {
  parameters: {
    docs: {
      storyDescription: "A selectable kpi with the total numbers of event.",
    },
    eyes: {
      // waiting until external charts are rendered (issue #1792)
      waitBeforeScreenshot: "[id|=reactgooglegraph]",
    },
  },
};

export const SelectableNoSemantic = () => {
  const labels = {
    title: "Total number of events",
    indicator: "508K",
    unit: "",
    comparisonIndicatorInfo: "vs last 24h.",
    comparisonIndicator: "82,05%",
  };

  const IopsComparisonVisualAverage = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ArrowDown title="Down" boxStyles={{ width: "20px", height: "20px" }} semantic="sema4" />
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
        pointerEvents: "none",
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

  const kpiContainer = {
    paddingTop: "20px",
  };

  const KpiT = () => (
    <div style={kpiContainer}>
      <HvKpi
        labels={labels}
        visualIndicator={<Average title="Bad" semantic="sema4" />}
        trendIndicator={<TrendIndicator />}
        visualComparison={<IopsComparisonVisualAverage />}
      />
    </div>
  );

  return (
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
};

SelectableNoSemantic.story = {
  parameters: {
    docs: {
      storyDescription: "A selectable kpi with the total numbers of event.",
    },
    eyes: {
      // waiting until external charts are rendered (issue #1792)
      waitBeforeScreenshot: "[id|=reactgooglegraph]",
    },
  },
};

export const SelectableNoTrendIcon = () => {
  const labels = {
    title: "Caution events",
    indicator: "222",
    unit: "",
    comparisonIndicatorInfo: "vs last 24h.",
    comparisonIndicator: "0,37%",
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
        pointerEvents: "none",
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
          ["2016", 2890],
        ]}
        options={{
          legend: "none",
          colors: ["#E68C17"],
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

  const kpiContainer = {
    paddingTop: "20px",
  };

  const KpiT = () => (
    <div style={kpiContainer}>
      <HvKpi
        labels={labels}
        visualIndicator={<Level3Bad title="Warning" semantic="sema13" />}
        trendIndicator={<TrendIndicator />}
        visualComparison={<IopsComparisonVisualAverage />}
      />
    </div>
  );

  return (
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
};

SelectableNoTrendIcon.story = {
  parameters: {
    docs: {
      storyDescription: "A selectable kpi with the total numbers of event.",
    },
    eyes: {
      // waiting until external charts are rendered (issue #1792)
      waitBeforeScreenshot: "[id|=reactgooglegraph]",
    },
  },
};
