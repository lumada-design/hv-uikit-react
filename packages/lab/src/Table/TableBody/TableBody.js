import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import TableContext from "../TableSectionContext";
import styles from "./styles";

const tableContext = {
  variant: "body",
  padding: "default",
};

/**
 * HvTableBody acts as a `tbody` element.
 * `HvTableCell` and `HvTableRow` elements in it inherit body-specific styles
 */
const HvTableBody = forwardRef(function HvTableBody(props, ref) {
  const { classes, className, ...others } = props;

  return (
    <TableContext.Provider value={tableContext}>
      <tbody className={clsx(classes.root, className)} ref={ref} {...others} />
    </TableContext.Provider>
  );
});

HvTableBody.propTypes = {
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

export default withStyles(styles, { name: "HvTableBody" })(HvTableBody);
