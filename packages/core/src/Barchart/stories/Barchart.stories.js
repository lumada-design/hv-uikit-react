import { makeStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { useState, useEffect } from "react";
import { Random } from "../../utils";
import { HvBarchart, HvDropDownMenu, HvDropdown, HvTypography } from "../..";

export default {
  title: "Visualizations/Bar Chart",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvBarchart } from '@hv/uikit-react-core/dist'"
  },
  component: HvBarchart
};

export const Main = () => {
  const layout = {
    yaxis: { showline: false }
  };
  return (
    <HvBarchart
      layout={layout}
      data={[
        {
          x: ["January", "February", "March"],
          y: [2300, 1000, 8500],
          name: "Sales Target"
        }
      ]}
    />
  );
};

export const VerticalWithSingleTooltip = () => {
  const trace1 = {
    x: ["January", "February", "March"],
    y: [2300, 1000, 8500],
    name: "Sales Target"
  };

  const data = [trace1];

  const layout = {
    yaxis: { showline: false }
  };

  return <HvBarchart data={data} tooltipType="single" layout={layout} />;
};

VerticalWithSingleTooltip.parameters = {
  docs: {
    description: { story: "Tooltip in single line mode." }
  }
};

export const GroupedVerticalBarchart = () => {
  const data = [
    { x: ["Group 1", "Group 2", "Group 3"], y: [2300, 1000, 8500], name: "Sales Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [6000, 3900, 1000], name: "Sales Per Rep" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [3700, 7500, 1100], name: "Monthly Sales" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [2100, 8500, 3000], name: "Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [500, 8000, 9500], name: "Cash" }
  ];

  const layout = {
    legend: { orientation: "h", x: 0.2, y: 1.1 },
    yaxis: { showline: false }
  };

  return <HvBarchart data={data} layout={layout} />;
};

GroupedVerticalBarchart.parameters = {
  docs: {
    description: { story: "Representation of groups by using multiple bars." }
  }
};

export const CustomStackedVerticalBarchart = () => {
  const styles = () => ({
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  });

  const ChartHeader = withStyles(styles)(({ classes, children }) => (
    <div className={classes.wrapper}>{children}</div>
  ));

  const data = [
    {
      x: ["ASR3", "HAL9", "DR21", "HY54", "KW65", "RE98", "ZX52", "UI56"],
      y: [50, 350, 420, 310, 390, 420, 200, 430],
      name: "Uploads"
    },
    {
      x: ["ASR3", "HAL9", "DR21", "HY54", "KW65", "RE98", "ZX52", "UI56"],
      y: [370, 80, 60, 280, 310, 320, 110, 190],
      name: "Downloads"
    }
  ];

  const layout = {
    legend: { orientation: "h", x: 0.4, y: 1.1 },

    yaxis: {
      ticksuffix: " Gb",
      showline: false
    }
  };

  const useStyles = makeStyles(() => ({
    titlePadding: { marginTop: 10 },
    dropdownPlacement: {
      marginTop: 24,
      marginLeft: 10
    },
    controllerGroup: {
      display: "flex"
    }
  }));

  const classes = useStyles();

  return (
    <>
      <ChartHeader>
        <HvTypography className={classes.titlePadding} variant="mTitle">
          Server Status Summary
        </HvTypography>
        <div className={classes.controllerGroup}>
          <HvDropdown
            id="dropdown2"
            labels={{ title: "Time Period" }}
            classes={{ root: classes.root }}
            values={[
              { label: "Last 0.5h" },
              { label: "Last 1.5h", selected: true },
              { label: "Last 24h" },
              { label: "Last 48h" }
            ]}
          />
          <HvDropDownMenu
            className={classes.dropdownPlacement}
            onClick={(e, item) => console.log(item.label)}
            dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
          />
        </div>
      </ChartHeader>

      <HvBarchart stack data={data} layout={layout} />
    </>
  );
};

CustomStackedVerticalBarchart.story = {
  parameters: {
    docs: {
      storyDescription: "Groups in stack mode."
    }
  }
};

export const StackedVerticalBarchart = () => {
  const data = [
    { x: ["Group 1", "Group 2", "Group 3"], y: [2300, 1000, 8500], name: "Sales Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [6000, 3900, 1000], name: "Sales Per Rep" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [3700, 7500, 1100], name: "Monthly Sales" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [2100, 8500, 3000], name: "Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [500, 8000, 9500], name: "Cash" }
  ];

  const layout = {
    legend: { orientation: "h", x: 0.2, y: 1.1 },
    yaxis: { showline: false }
  };

  return <HvBarchart stack data={data} layout={layout} />;
};

StackedVerticalBarchart.parameters = {
  docs: {
    description: { story: "Groups in stack mode." }
  }
};

export const SimpleHorizontalBarchart = () => {
  const layout = {
    legend: { orientation: "h", x: 0.2, y: 1.1 },
    xaxis: { showline: false }
  };

  return (
    <HvBarchart
      horizontal
      layout={layout}
      data={[
        {
          x: [2300, 1000, 8500],
          y: ["January", "February", "March"],
          name: "Sales Target"
        }
      ]}
    />
  );
};

SimpleHorizontalBarchart.parameters = {
  docs: {
    description: { story: "Representation of horizontal chart." }
  }
};

export const HorizontalBarchartWithSingleTooltip = () => {
  const layout = {
    legend: { orientation: "h", x: 0.2, y: 1.1 },
    xaxis: { showline: false }
  };

  return (
    <HvBarchart
      horizontal
      tooltipType="single"
      data={[
        {
          x: [2300, 1000, 8500],
          y: ["January", "February", "March"],
          name: "Sales Target"
        }
      ]}
      layout={layout}
    />
  );
};

HorizontalBarchartWithSingleTooltip.parameters = {
  docs: {
    description: { story: "Tooltip in single line mode." }
  }
};

export const GroupedHorizontalBarchart = () => {
  const data = [
    { y: ["Group 1", "Group 2", "Group 3"], x: [2300, 1000, 8500], name: "Sales Target" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [6000, 3900, 1000], name: "Sales Per Rep" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [3700, 7500, 1100], name: "Monthly Sales" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [2100, 8500, 3000], name: "Target" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [500, 8000, 9500], name: "Cash" }
  ];

  const layout = {
    legend: { orientation: "h", x: 0.2, y: 1.1 },
    xaxis: { showline: false }
  };

  return <HvBarchart horizontal data={data} layout={layout} />;
};

GroupedHorizontalBarchart.parameters = {
  docs: {
    description: { story: "Representation of groups by using multiple horizontal bars." }
  }
};

export const StackedHorizontalBarchart = () => {
  const data = [
    { y: ["Group 1", "Group 2", "Group 3"], x: [2300, 1000, 8500], name: "Sales Target" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [6000, 3900, 1000], name: "Sales Per Rep" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [3700, 7500, 1100], name: "Monthly Sales" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [2100, 8500, 3000], name: "Target" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [500, 8000, 9500], name: "Cash" }
  ];
  const layout = {
    legend: { orientation: "h", x: 0.2, y: 1.1 },
    xaxis: { showline: false }
  };

  return <HvBarchart stack data={data} horizontal layout={layout} />;
};

StackedHorizontalBarchart.parameters = {
  docs: {
    description: { story: "Groups in stack mode." }
  }
};

export const WithIntervalUpdates = () => {
  const r = new Random();

  const [data, setData] = useState([
    {
      x: ["January", "February", "March"],
      y: [2300, 1000, 8500],
      name: "Sales Target"
    }
  ]);

  useEffect(() => {
    const interval = setTimeout(() => {
      setData([
        {
          x: ["January", "February", "March"],
          y: [r.next(1000, 3000), r.next(500, 3500), 8500],
          name: "Sales Target"
        }
      ]);
    }, 2000);

    return () => clearTimeout(interval);
  });

  const layout = {
    yaxis: { showline: false }
  };

  return <HvBarchart data={data} layout={layout} />;
};

WithIntervalUpdates.parameters = {
  docs: {
    description: { story: "Data updated each second." }
  }
};
