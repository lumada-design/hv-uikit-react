import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvEmptyState from "@hv/uikit-react-core/dist/EmptyState";
import Ghost from "@hv/uikit-react-icons/dist/Generic/Ghost";

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

export default (
  <HvEmptyState
    title="Resource not found."
    message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    icon={<StyledGhost iconSize="L" />}
  />
);
