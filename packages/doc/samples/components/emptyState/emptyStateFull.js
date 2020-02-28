import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvEmptyState from "@hv/uikit-react-core/dist/EmptyState";
import BarChart from "@hv/uikit-react-icons/dist/BarChart";

const styles = theme => ({
  root: {
    width: "112px",
    height: "112px",
    "& svg .color0": {
      fill: theme.hv.palette.atmosphere.atmo7
    }
  }
});

const StyledBarChart = withStyles(styles, { withTheme: true })(BarChart);

const CustomAction = <a href="/">Create a new data route</a>;

export default (
  <HvEmptyState
    title="Start building data routes"
    message="Before we create any dashboard we need to get some data."
    action={CustomAction}
    icon={<StyledBarChart iconSize="L" />}
  />
);
