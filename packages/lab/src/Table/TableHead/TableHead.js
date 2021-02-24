import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import TableContext from "../TableContext";
import styles from "./styles";

const tableContext = {
  variant: "head",
  padding: "default",
};

/**
 * HvTableHead acts as a `thead` element.
 * `HvTableCell` and `HvTableRow` elements in it inherit header-specific styles
 */
const HvTableHead = forwardRef(function HvTableHead(props, ref) {
  const { classes, className, ...others } = props;

  return (
    <TableContext.Provider value={tableContext}>
      <thead className={clsx(classes.root, className)} ref={ref} {...others} />
    </TableContext.Provider>
  );
});

HvTableHead.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Content to be rendered
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

export default withStyles(styles, { name: "HvTableHead" })(HvTableHead);
