import { makeStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import { HvDonutchart, HvDropDownMenu, HvDropdown, HvTypography } from "../..";

export default {
  title: "Visualizations/Donut Chart",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvDonutchart } from '@hv/uikit-react-core/dist'"
  },
  component: HvDonutchart
};

export const Main = () => (
  <HvDonutchart
    title="Simple Donut"
    subtitle="Server Status Summary"
    data={[
      {
        values: [250, 800],
        labels: ["Uploads", "Downloads"],
        name: "Music"
      }
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
          name: "Music"
        }
      ]}
      type="thin"
    />
  );
};

DonutChartThin.story = {
  parameters: {
    docs: {
      storyDescription: "Thin Donut."
    }
  }
};

export const DonutChartWithControls = () => {
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

  const useStyles = makeStyles(() => ({
    root: {
      width: 250
    },
    label: { paddingBottom: 6 },
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
        <HvTypography className={classes.titlePadding} variant="xsTitle">
          Server Status Summary
        </HvTypography>
        <div className={classes.controllerGroup}>
          <HvDropdown
            id="dropdown2"
            labels={{ title: "Time Period" }}
            classes={{ root: classes.root, dropdown: classes.root, label: classes.label }}
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
      <HvDonutchart
        title="Simple Donut"
        subtitle="Server Status Summary"
        data={[
          {
            values: [250, 800],
            labels: ["Uploads", "Downloads"],
            name: "Music"
          }
        ]}
      />
    </>
  );
};

DonutChartWithControls.story = {
  parameters: {
    docs: {
      storyDescription: "Donut chart with controls."
    }
  }
};
