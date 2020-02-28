import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const Component = ({ classes }) => {
  return <div className={classes.root}>Sample Component</div>;
};

Component.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(Component);
