import React from "react";
import PropTypes from "prop-types";
import { DialogActions, withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * Actions of the modal.
 *
 * @param classes
 * @param children
 * @param others
 * @returns {*}
 * @constructor
 */
const HvModalActions = ({ classes, className, children, ...others }) => (
  <DialogActions
    classes={{
      root: classes.root,
      action: classes.action
    }}
    className={className}
    {...others}
  >
    {children}
  </DialogActions>
);

HvModalActions.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component (container for the actions).
     */
    root: PropTypes.string,
    /**
     * Style applied to each child action.
     */
    action: PropTypes.string
  }).isRequired,
  /**
   * Actions of the modal.
   */
  children: PropTypes.node.isRequired
};

HvModalActions.defaultProps = {
  className: ""
};

export default withStyles(styles, { name: "HvModalActions" })(HvModalActions);
