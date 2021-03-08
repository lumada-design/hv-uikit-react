import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import styles from "./styles";

/**
 * HvTableContainer is a container for the HvTable
 */
const HvTableContainer = forwardRef(function HvTableContainer(props, ref) {
  const { classes, className, ...others } = props;

  return <div ref={ref} className={clsx(classes.root, className)} {...others} />;
});

HvTableContainer.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Content to be rendered. Usually `<HvTable>`
   */
  children: PropTypes.node,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvTableContainer" })(HvTableContainer);
