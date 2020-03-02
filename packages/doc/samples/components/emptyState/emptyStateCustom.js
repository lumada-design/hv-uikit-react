import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvEmptyState from "@hv/uikit-react-core/dist/EmptyState";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import Ghost from "@hv/uikit-react-icons/dist/Ghost";

const styles = theme => ({
  root: {
    width: "112px",
    height: "112px",
    "& svg .color0": {
      fill: theme.hv.palette.atmosphere.atmo7
    }
  }
});

const StyledGhost = withStyles(styles, { withTheme: true })(Ghost);

const CustomMessage = <HvTypography>404 Not Found</HvTypography>;
const CustomAction = (
  <HvTypography component="div">
    <div>Here are some helpful links instead:</div>
    <div>
      <a href="/">Online Help</a>
    </div>
  </HvTypography>
);

export default (
  <HvEmptyState
    title="This page can't be displayed"
    message={CustomMessage}
    action={CustomAction}
    icon={<StyledGhost iconSize="L" />}
  />
);
