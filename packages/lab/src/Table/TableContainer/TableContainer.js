import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@mui/styles";

import styles from "./styles";

/**
 * HvTableContainer is a container for the HvTable
 */
const HvTableContainer = forwardRef(function HvTableContainer(props, ref) {
  const { classes, className, component, ...others } = props;

  const Component = component || "div";

  return <Component ref={ref} className={clsx(classes.root, className)} {...others} />;
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
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to div.
   */
  component: PropTypes.elementType,
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
