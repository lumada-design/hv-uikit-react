import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import TableContext from "../TableSectionContext";
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
  const { classes, className, stickyHeader, ...others } = props;

  return (
    <TableContext.Provider value={tableContext}>
      <thead
        className={clsx(classes.root, className, { [classes.stickyHeader]: stickyHeader })}
        ref={ref}
        {...others}
      />
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
   * The table has sticky headers.
   */
  stickyHeader: PropTypes.bool,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied when the table has a sticky header.
     */
    stickyHeader: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvTableHead" })(HvTableHead);
