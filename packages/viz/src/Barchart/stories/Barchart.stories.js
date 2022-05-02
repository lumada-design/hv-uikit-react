import { makeStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import { HvDropDownMenu, HvDropdown, HvTypography } from "@hitachivantara/uikit-react-core";

import { HvBarchart } from "../..";

export default {
  title: "Visualizations/Bar Chart",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvBarchart } from "@hitachivantara/uikit-react-viz"',
    maturityStatus: "stable",
    dsVersion: "3.2.1",
  },
  component: HvBarchart,
};

export const Main = () => (
  <HvBarchart
    data={[
      {
        x: ["January", "February", "March"],
        y: [2300, 1000, 6700],
        name: "Sales Target",
      },
    ]}
  />
);

export const VerticalWithSingleTooltip = () => {
  const trace1 = {
    x: ["January", "February", "March"],
    y: [2300, 1000, 6700],
    name: "Sales Target",
  };

  const data = [trace1];

  return <HvBarchart data={data} tooltipType="single" />;
};

VerticalWithSingleTooltip.parameters = {
  docs: {
    description: { story: "Tooltip in single line mode." },
  },
};

export const GroupedVerticalBarchart = () => {
  const data = [
    { x: ["Group 1", "Group 2", "Group 3"], y: [2300, 1000, 7800], name: "Sales Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [6000, 3900, 1000], name: "Sales Per Rep" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [3700, 6700, 1100], name: "Monthly Sales" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [2100, 7700, 3000], name: "Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [500, 7600, 7800], name: "Cash" },
  ];
  const layout = {
    hovermode: "x",
  };

  return <HvBarchart data={data} layout={layout} />;
};

GroupedVerticalBarchart.parameters = {
  docs: {
    description: { story: "Representation of groups by using multiple bars." },
  },
};

export const CustomStackedVerticalBarchart = () => {
  const styles = () => ({
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
  });

  const ChartHeader = withStyles(styles)(({ classes, children }) => (
    <div className={classes.wrapper}>{children}</div>
  ));

  const data = [
    {
      x: ["ASR3", "HAL9", "DR21", "HY54", "KW65", "RE98", "ZX52", "UI56"],
      y: [50, 350, 420, 310, 390, 420, 200, 430],
      name: "Uploads",
    },
    {
      x: ["ASR3", "HAL9", "DR21", "HY54", "KW65", "RE98", "ZX52", "UI56"],
      y: [370, 80, 60, 280, 310, 320, 110, 190],
      name: "Downloads",
    },
  ];

  const layout = {
    yaxis: {
      ticksuffix: " Gb",
      autorange: false,
      range: [0, 850],
      dtick: 100,
    },
  };

  const useStyles = makeStyles(() => ({
    root: {
      width: 250,
    },
    label: { paddingBottom: 6 },
    titlePadding: { marginTop: 10 },
    dropdownPlacement: {
      marginLeft: 10,
    },
    controllerGroup: {
      display: "flex",
      alignItems: "flex-end",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <ChartHeader>
        <HvTypography className={classes.titlePadding} variant="xsTitle">
          Server Status Summary
        </HvTypography>
        <div className={classes.controllerGroup}>
          <HvDropdown
            id="dropdown2"
            label="Time Period"
            placement="left"
            classes={{ root: classes.root, dropdown: classes.root, label: classes.label }}
            values={[
              { label: "Last 0.5h" },
              { label: "Last 1.5h", selected: true },
              { label: "Last 24h" },
              { label: "Last 48h" },
            ]}
          />
          <HvDropDownMenu
            className={classes.dropdownPlacement}
            onClick={(e, item) => console.log(item.label)}
            dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
            placement="left"
          />
        </div>
      </ChartHeader>

      <HvBarchart stack data={data} layout={layout} />
    </>
  );
};

CustomStackedVerticalBarchart.parameters = {
  docs: {
    description: { story: "Bar chart with title and controls." },
  },
};

export const StackedVerticalBarchart = () => {
  const data = [
    { x: ["Group 1", "Group 2", "Group 3"], y: [2300, 1000, 8500], name: "Sales Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [6000, 3900, 1000], name: "Sales Per Rep" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [3700, 7500, 1100], name: "Monthly Sales" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [2100, 8500, 3000], name: "Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [500, 8000, 9500], name: "Cash" },
  ];

  return <HvBarchart stack data={data} />;
};

StackedVerticalBarchart.parameters = {
  docs: {
    description: { story: "Groups in stack mode." },
  },
};

export const SimpleHorizontalBarchart = () => (
  <HvBarchart
    horizontal
    data={[
      {
        x: [2300, 1000, 6700],
        y: ["January", "February", "March"],
        name: "Sales Target",
      },
    ]}
  />
);

SimpleHorizontalBarchart.parameters = {
  docs: {
    description: { story: "Representation of horizontal chart." },
  },
};

export const HorizontalBarchartWithSingleTooltip = () => (
  <HvBarchart
    horizontal
    tooltipType="single"
    data={[
      {
        x: [2300, 1000, 6700],
        y: ["January", "February", "March"],
        name: "Sales Target",
      },
    ]}
  />
);

HorizontalBarchartWithSingleTooltip.parameters = {
  docs: {
    description: { story: "Tooltip in single line mode." },
  },
};

export const GroupedHorizontalBarchart = () => {
  const data = [
    { y: ["Group 1", "Group 2", "Group 3"], x: [2300, 1000, 7800], name: "Sales Target" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [6000, 3900, 1000], name: "Sales Per Rep" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [3700, 6700, 1100], name: "Monthly Sales" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [2100, 7700, 3000], name: "Target" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [500, 7600, 7800], name: "Cash" },
  ];
  const layout = {
    hovermode: "y",
  };

  return <HvBarchart horizontal data={data} layout={layout} />;
};

GroupedHorizontalBarchart.parameters = {
  docs: {
    description: { story: "Representation of groups by using multiple horizontal bars." },
  },
};

export const StackedHorizontalBarchart = () => {
  const data = [
    { y: ["Group 1", "Group 2", "Group 3"], x: [2300, 1000, 8500], name: "Sales Target" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [6000, 3900, 1000], name: "Sales Per Rep" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [3700, 7500, 1100], name: "Monthly Sales" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [2100, 8500, 3000], name: "Target" },
    { y: ["Group 1", "Group 2", "Group 3"], x: [500, 8000, 9500], name: "Cash" },
  ];

  return <HvBarchart stack data={data} horizontal />;
};

StackedHorizontalBarchart.parameters = {
  docs: {
    description: { story: "Groups in stack mode." },
  },
};
