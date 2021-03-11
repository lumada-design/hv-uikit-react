import React, { forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import styles from "./styles";
import TableContext from "../TableSectionContext";

/**
 * `HvTableRow` acts as a `tr` element and inherits styles from its context
 */
const HvTableRow = forwardRef(function HvTableRow(props, ref) {
  const { classes, className, hover = false, selected = false, ...others } = props;
  const tableContext = useContext(TableContext);

  return (
    <tr
      ref={ref}
      className={clsx(className, classes.root, {
        [classes.head]: tableContext?.variant === "head",
        [classes.body]: tableContext?.variant === "body",
        [classes.footer]: tableContext?.variant === "footer",
        [classes.hover]: hover,
        [classes.selected]: selected,
      })}
      {...others}
    />
  );
});

HvTableRow.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Content to be rendered
   */
  children: PropTypes.node,
  /**
   * Whether the table row will shade on hover.
   */
  hover: PropTypes.bool,
  /**
   * Whether the table row will have the selected shading.
   */
  selected: PropTypes.bool,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component root when selected.
     */
    selected: PropTypes.string,
    /**
     * Styles applied to the component root on hover.
     */
    hover: PropTypes.string,
    /**
     * Styles applied to the component root when inside a `HvTableHead`.
     */
    head: PropTypes.string,
    /**
     * Styles applied to the component root when inside a `HvTableBody`.
     */
    body: PropTypes.string,
    /**
     * Styles applied to the component root when inside a `HvTableFooter`.
     */
    footer: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvTableRow" })(HvTableRow);
