import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * This component is used as a building block for the Action bar pattern, it's objective is to provide the .
 */
const ActionContainer = props => {
  const { classes, className, id, children, ...others } = props;

  return (
    <div id={id} className={clsx(classes.root, className)} {...others}>
      {children}
    </div>
  );
};

ActionContainer.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * The content of the action container.
   */
  children: PropTypes.node.isRequired
};

export default withStyles(styles, { name: "HvActionContainer" })(ActionContainer);
