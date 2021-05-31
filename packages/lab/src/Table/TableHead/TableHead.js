import React, { forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";
import styles from "./styles";

const tableSectionContext = {
  type: "head",
};

const defaultComponent = "thead";

/**
 * HvTableHead acts as a `thead` element.
 * `HvTableCell` and `HvTableRow` elements in it inherit header-specific styles
 */
const HvTableHead = forwardRef(function HvTableHead(props, ref) {
  const { classes, className, component, stickyHeader, ...others } = props;

  const tableContext = useContext(TableContext);

  const Component = component || tableContext?.components?.THead || defaultComponent;

  return (
    <TableSectionContext.Provider value={tableSectionContext}>
      <Component
        className={clsx(classes.root, className, { [classes.stickyHeader]: stickyHeader })}
        ref={ref}
        role={Component === defaultComponent ? null : "rowgroup"}
        {...others}
      />
    </TableSectionContext.Provider>
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
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to thead.
   */
  component: PropTypes.elementType,
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
