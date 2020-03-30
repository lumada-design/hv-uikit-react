import React from "react";
import PropTypes from "prop-types";
import { AppBar, withStyles } from "@material-ui/core";
import styles from "./styles";

const Header = ({ classes, position = "fixed", children, ...others }) => (
  <AppBar classes={{ root: classes.root }} position={position} {...others}>
    <div className={classes.header}>{children}</div>
  </AppBar>
);

Header.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component header class.
     */
    header: PropTypes.string
  }).isRequired,
  /**
   * Position of the component.
   */
  position: PropTypes.oneOf(["static", "relative", "fixed", "absolute", "sticky"]),
  /**
   * Children to be rendered.
   */
  children: PropTypes.node.isRequired
};

export default withStyles(styles, { name: "HvHeader" })(Header);
