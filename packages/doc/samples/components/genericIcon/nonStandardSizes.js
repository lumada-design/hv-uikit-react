import React from "react";
import { CheckboxCheck } from "@hv/uikit-react-icons/dist";
import withStyles from "@material-ui/core/styles/withStyles";
import classnames from "classnames";

const styles = () => ({
  containerSize: {
    "&.override": {
      height: "210px",
      width: "210px"
    }
  }
});

const StyledIcon = withStyles(styles)(({ classes }) => (
  <CheckboxCheck
    className={classnames(classes.containerSize, "override")}
    height="200"
    width="200"
  />
));

export default <StyledIcon />;
