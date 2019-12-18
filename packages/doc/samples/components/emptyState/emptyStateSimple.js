import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvEmptyState from "@hv/uikit-react-core/dist/EmptyState";
import Fail from "@hv/uikit-react-icons/dist/Generic/Fail";

const styles = theme => ({
  root: {
    width: "112px",
    height: "112px",
    "& svg .color0": {
      fill: theme.hv.palette.atmosphere.atmo7
    }
  }
});

const StyledFail = withStyles(styles, { withTheme: true })(Fail);

export default (
  <HvEmptyState
    title="No data routes"
    message="After you start adding Data Routes, they will appear in here."
    icon={<StyledFail iconSize="L" />}
  />
);
