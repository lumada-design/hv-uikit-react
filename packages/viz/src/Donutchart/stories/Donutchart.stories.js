import { makeStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import { HvDropDownMenu, HvDropdown, HvTypography } from "@hitachivantara/uikit-react-core";

import { HvDonutchart } from "../..";

export default {
  title: "Visualizations/Donut Chart",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvDonutchart } from "@hitachivantara/uikit-react-viz"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvDonutchart,
};

export const Main = () => (
  <HvDonutchart
    title="Simple Donut"
    subtitle="Server Status Summary"
    data={[
      {
        values: [250, 800],
        labels: ["Uploads", "Downloads"],
        name: "Music",
      },
    ]}
  />
);

export const DonutChartThin = () => {
  return (
    <HvDonutchart
      title="Thin Donut"
      subtitle="Server Status Summary"
      data={[
        {
          values: [540, 1234],
          labels: ["Uploads", "Downloads"],
          name: "Music",
        },
      ]}
      type="thin"
    />
  );
};

DonutChartThin.parameters = {
  docs: {
    description: { story: "Thin Donut." },
  },
};

export const DonutChartWithControls = () => {
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

  const useStyles = makeStyles(() => ({
    root: {
      width: 250,
    },
    label: { paddingBottom: 6 },
    titlePadding: { marginTop: 10 },
    dropdownSeparator: {
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
          <div className={classes.dropdownSeparator}>
            <HvDropDownMenu
              onClick={(e, item) => console.log(item.label)}
              dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
              placement="left"
            />
          </div>
        </div>
      </ChartHeader>
      <HvDonutchart
        title="Simple Donut"
        subtitle="Server Status Summary"
        data={[
          {
            values: [250, 800],
            labels: ["Uploads", "Downloads"],
            name: "Music",
          },
        ]}
      />
    </>
  );
};

DonutChartWithControls.parameters = {
  docs: {
    description: { story: "Donut chart with title and controls." },
  },
};
