import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import styles from "./styles";

/**
 * This component acts as a container for the Action Bar pattern.
 */
const HvActionBar = (props) => {
  const { classes, className, id, children, ...others } = props;

  return (
    <div id={id} className={clsx(classes.root, className)} {...others}>
      {children}
    </div>
  );
};

HvActionBar.propTypes = {
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
    root: PropTypes.string,
  }).isRequired,
  /**
   * The content of the action container.
   */
  children: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "HvActionBar" })(HvActionBar);
