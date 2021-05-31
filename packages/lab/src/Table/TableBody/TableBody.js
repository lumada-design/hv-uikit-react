import React, { forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";
import styles from "./styles";

const tableSectionContext = {
  type: "body",
};

const defaultComponent = "tbody";

/**
 * HvTableBody acts as a `tbody` element.
 * `HvTableCell` and `HvTableRow` elements in it inherit body-specific styles
 */
const HvTableBody = forwardRef(function HvTableBody(props, ref) {
  const { classes, className, component, ...others } = props;

  const tableContext = useContext(TableContext);

  const Component = component || tableContext?.components?.TBody || defaultComponent;

  return (
    <TableSectionContext.Provider value={tableSectionContext}>
      <Component
        className={clsx(classes.root, className)}
        ref={ref}
        role={Component === defaultComponent ? null : "rowgroup"}
        {...others}
      />
    </TableSectionContext.Provider>
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
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to tbody.
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

export default withStyles(styles, { name: "HvTableBody" })(HvTableBody);
