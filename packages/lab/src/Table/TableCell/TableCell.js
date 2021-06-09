import React, { forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import capitalize from "lodash/capitalize";

import { withStyles } from "@material-ui/core";
import styles from "./styles";
import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";

const defaultComponent = "td";

/**
 * `HvTableCell` acts as a `td` element and inherits styles from its context
 */
const HvTableCell = forwardRef(function HvTableCell(props, ref) {
  const {
    children,

    component,

    className,
    style,
    classes,

    align = "inherit",
    variant = "default",

    type: typeProp,

    stickyColumn = false,
    stickyColumnMostLeft = false,
    stickyColumnLeastRight = false,

    sorted = false,

    ...others
  } = props;

  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);

  const type = typeProp || tableSectionContext?.type || "body";

  const Component = component || tableContext?.components?.Td || defaultComponent;

  return (
    <Component
      ref={ref}
      role={Component === defaultComponent ? null : "cell"}
      style={style}
      className={clsx(className, classes.root, classes[type], {
        [classes[`align${capitalize(align)}`]]: align !== "inherit",
        [classes[`variant${capitalize(variant)}`]]: variant !== "default",

        [classes.sorted]: sorted,

        [classes.stickyColumn]: stickyColumn,
        [classes.stickyColumnMostLeft]: stickyColumnMostLeft,
        [classes.stickyColumnLeastRight]: stickyColumnLeastRight,
      })}
      {...others}
    >
      {children}
    </Component>
  );
});

HvTableCell.propTypes = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to td.
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
   * Inline styles to be applied to the root element.
   */
  style: PropTypes.instanceOf(Object),

  /**
   * Set the text-align on the table cell content.
   */
  align: PropTypes.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * Sets the cell's variant.
   */
  variant: PropTypes.oneOf(["checkbox", "expand", "actions", "default", "none"]),

  /**
   * Specify the cell's type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  type: PropTypes.oneOf(["body", "footer", "head"]),

  /**
   * Whether or not the cell is part of a sorted column.
   */
  sorted: PropTypes.bool,

  /**
   * The cell is part of a sticky column.
   */
  stickyColumn: PropTypes.bool,
  /**
   * The cell is part of the last sticky to the left column.
   */
  stickyColumnMostLeft: PropTypes.bool,
  /**
   * The cell is part of the first sticky to the right column.
   */
  stickyColumnLeastRight: PropTypes.bool,

  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,

    /**
     * Styles applied to the cell when it's in the table head.
     */
    head: PropTypes.string,
    /**
     * Styles applied to the cell when it's in the table body.
     */
    body: PropTypes.string,
    /**
     * Styles applied to the cell when it's in the table footer.
     */
    footer: PropTypes.string,

    /**
     * Styles applied to the cell when it's part of a sticky column.
     */
    stickyColumn: PropTypes.string,
    /**
     * Styles applied to the cell when it's part of the last sticky to the left column.
     */
    stickyColumnMostLeft: PropTypes.string,
    /**
     * Styles applied to the cell when it's part of the first right sticky column.
     */
    stickyColumnLeastRight: PropTypes.string,

    /**
     * Styles applied to the cell when it's part of a sorted column.
     */
    sorted: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvTableCell" })(HvTableCell);
