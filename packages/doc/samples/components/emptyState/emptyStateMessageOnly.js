import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvEmptyState from "@hv/uikit-react-core/dist/EmptyState";
import Fail from "@hv/uikit-react-icons/dist/Fail";

const styles = () => ({
  root: {
    width: "32px",
    height: "32px"
  }
});

const StyledFail = withStyles(styles, { withTheme: true })(Fail);

export default (
  <HvEmptyState message="No data to display" icon={<StyledFail />} />
);
