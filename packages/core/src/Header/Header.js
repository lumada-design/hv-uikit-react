import React from "react";
import PropTypes from "prop-types";
import { AppBar } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

/**
 * The header should be informative and provide the most important information about the digital product so that users can scan it in split seconds.
 *
 * Our implementation of the Header is divided in:
 * <ul>
 * <li>Brand</li>
 * <li>Navigation</li>
 * <li>Actions</li>
 * </ul>
 */
const HvHeader = ({ classes, position = "fixed", children, ...others }) => {
  return (
    <AppBar
      classes={{ root: classes.root, colorPrimary: classes.backgroundColor }}
      position={position}
      {...others}
    >
      <div className={classes.header}>{children}</div>
    </AppBar>
  );
};

HvHeader.propTypes = {
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
    header: PropTypes.string,
    /**
     * Styles applied to the component background color.
     */
    backgroundColor: PropTypes.string,
  }).isRequired,
  /**
   * Position of the component.
   */
  position: PropTypes.oneOf(["static", "relative", "fixed", "absolute", "sticky"]),
  /**
   * Children to be rendered.
   */
  children: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "HvHeader" })(HvHeader);
