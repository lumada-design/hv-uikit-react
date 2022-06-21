import React, { forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import styles from "./styles";
import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";

const defaultComponent = "tr";

/**
 * `HvTableRow` acts as a `tr` element and inherits styles from its context
 */
const HvTableRow = forwardRef(function HvTableRow(props, ref) {
  const {
    classes,
    className,
    component,
    hover = false,
    selected = false,
    expanded = false,
    striped = false,
    ...others
  } = props;

  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);

  const type = tableSectionContext?.type || "body";

  const isList = tableContext.variant === "listrow";

  const Component = component || tableContext?.components?.Tr || defaultComponent;

  return (
    <Component
      ref={ref}
      className={clsx(
        classes.root,
        classes[type],
        {
          [classes.hover]: hover,
          [classes.selected]: selected,
          [classes.expanded]: expanded,
          [classes.striped]: striped,
          [classes.variantList]: isList && type === "body",
          [classes.variantListHead]: isList && type === "head",
        },
        tableSectionContext.filterClassName,
        className
      )}
      role={Component === defaultComponent ? null : "row"}
      {...others}
    />
  );
});

HvTableRow.propTypes = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to tr.
   */
  component: PropTypes.elementType,
  /**
   * Content to be rendered
   */
  children: PropTypes.node,

  /**
   * Class names to be applied.
   */
  className: PropTypes.string,

  /**
   * Whether the table row will shade on hover.
   */
  hover: PropTypes.bool,
  /**
   * Whether the table row will have the selected shading.
   */
  selected: PropTypes.bool,
  /**
   * Whether the table row is expanded.
   */
  expanded: PropTypes.bool,
  /**
   * Whether the table row background is striped.
   */
  striped: PropTypes.bool,
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
     * Styles applied to the component root when expanded.
     */
    expanded: PropTypes.string,
    /**
     * Styles applied to the component root when striped.
     */
    striped: PropTypes.string,
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
    /**
     * Styles applied to the component root when its table variant is list.
     */
    variantList: PropTypes.string,
    /**
     * Styles applied to the component root when its table variant is list.
     */
    variantListHead: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvTableRow" })(HvTableRow);
