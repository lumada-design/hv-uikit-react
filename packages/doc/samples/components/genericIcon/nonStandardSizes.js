import React from "react";
import CheckboxCheck from "@hv/uikit-react-icons/dist/Generic/CheckboxCheck";
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

const wrappedIcon = ({ classes }) => (
  <>
    <CheckboxCheck
      className={classnames(classes.containerSize, "override")}
      height="200"
      width="200"
    />
  </>
);

const Component = withStyles(styles, { withTheme: true })(wrappedIcon);

export default <Component />;
