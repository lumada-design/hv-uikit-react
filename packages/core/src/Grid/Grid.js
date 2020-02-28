import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import useWidth from "../utils/useWidth";
import styles from "./styles";

const BREAKPOINT_GUTTERS = {
  xs: 15,
  sm: 15,
  md: 30,
  lg: 30,
  xl: 30
};

const HvGrid = props => {
  const {
    alignContent,
    alignItems,
    classes,
    className: classNameProp,
    component: Component,
    container,
    direction,
    item,
    justify,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xl,
    xs,
    zeroMinWidth,
    ...other
  } = props;

  const width = useWidth();

  const breakpointSpacing = !isNil(spacing)
    ? spacing
    : BREAKPOINT_GUTTERS[width];

  const className = clsx(classes.root, classNameProp, {
    [classes.container]: container,
    [classes.item]: item,
    [classes.zeroMinWidth]: zeroMinWidth,
    [classes[`spacing-xs-${String(breakpointSpacing)}`]]:
      container && breakpointSpacing !== 0,
    [classes[`direction-xs-${String(direction)}`]]:
      direction !== HvGrid.defaultProps.direction,
    [classes[`wrap-xs-${String(wrap)}`]]: wrap !== HvGrid.defaultProps.wrap,
    [classes[`align-items-xs-${String(alignItems)}`]]:
      alignItems !== HvGrid.defaultProps.alignItems,
    [classes[`align-content-xs-${String(alignContent)}`]]:
      alignContent !== HvGrid.defaultProps.alignContent,
    [classes[`justify-xs-${String(justify)}`]]:
      justify !== HvGrid.defaultProps.justify,
    [classes[`grid-xs-${String(xs)}`]]: xs !== false,
    [classes[`grid-sm-${String(sm)}`]]: sm !== false,
    [classes[`grid-md-${String(md)}`]]: md !== false,
    [classes[`grid-lg-${String(lg)}`]]: lg !== false,
    [classes[`grid-xl-${String(xl)}`]]: xl !== false
  });
  return <Component className={className} {...other} />;
};

const gridSizes = ["auto", false, true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

HvGrid.propTypes = {
  /**
   * Defines the `align-content` style property.
   * It's applied for all screen sizes.
   */
  alignContent: PropTypes.oneOf([
    "stretch",
    "center",
    "flex-start",
    "flex-end",
    "space-between",
    "space-around"
  ]),
  /**
   * Defines the `align-items` style property.
   * It's applied for all screen sizes.
   */
  alignItems: PropTypes.oneOf([
    "flex-start",
    "center",
    "flex-end",
    "stretch",
    "baseline"
  ]),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   */
  container: PropTypes.bool,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   */
  direction: PropTypes.oneOf([
    "row",
    "row-reverse",
    "column",
    "column-reverse"
  ]),
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item: PropTypes.bool,
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   */
  justify: PropTypes.oneOf([
    "flex-start",
    "center",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly"
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs: PropTypes.oneOf(gridSizes),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm: PropTypes.oneOf(gridSizes),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md: PropTypes.oneOf(gridSizes),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg: PropTypes.oneOf(gridSizes),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl: PropTypes.oneOf(gridSizes),
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  spacing: PropTypes.number,
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap: PropTypes.oneOf(["nowrap", "wrap", "wrap-reverse"]),

  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth: PropTypes.bool
};

HvGrid.defaultProps = {
  alignContent: "stretch",
  alignItems: "stretch",
  component: "div",
  container: false,
  direction: "row",
  item: false,
  justify: "flex-start",
  lg: false,
  md: false,
  sm: false,
  spacing: undefined,
  wrap: "wrap",
  xl: false,
  xs: false,
  zeroMinWidth: false,
  className: undefined,
  children: undefined
};

export default withStyles(styles, { name: "HvGrid" })(HvGrid);
