import React from "react";
import PropTypes from "prop-types";
import isString from "lodash/isString";
import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import useWidth from "../utils/useWidth";

const BREAKPOINT_GUTTERS = {
  xs: 2,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
};

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * The grid creates visual consistency between layouts while allowing flexibility
 * across a wide variety of designs. This component is based in a 12-column grid layout.
 *
 * It is is based in the [Material UI Grid](https://material-ui.com/components/grid/#grid).
 *
 * The definitions were set following the Design System directives:
 *
 * | Breakpoint | Width (in px) | Gutters (in px) | Number of columns |
 * | ---------- | ------------- | --------------- | ----------------- |
 * | xs         | [0-600[       | 15              | 4                 |
 * | sm         | [600-960[     | 15              | 8                 |
 * | md         | [960-1270[    | 30              | 12                |
 * | lg         | [1270-1920[   | 30              | 12                |
 * | xl         | [1920-...[    | 30              | 12                |
 *
 */
const HvGrid = React.forwardRef(({ container, spacing = "auto", ...others }, ref) => {
  const width = useWidth();
  let gridSpacing = spacing;

  if (isString(spacing)) {
    if (spacing === "auto") {
      gridSpacing = BREAKPOINT_GUTTERS[width];
    } else {
      gridSpacing = BREAKPOINT_GUTTERS[spacing];
    }
  }

  return <Grid ref={ref} {...(container && { container, spacing: gridSpacing })} {...others} />;
});

/*
 * copied from Material-UI Grid.js since we simply override the styles of the component
 * please make sure this is updated when we update our Material-UI dependency
 */
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
    "space-around",
  ]),
  /**
   * Defines the `align-items` style property.
   * It's applied for all screen sizes.
   */
  alignItems: PropTypes.oneOf(["flex-start", "center", "flex-end", "stretch", "baseline"]),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the root element if container={true}.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the root element if item={true}.
     */
    item: PropTypes.string,
    /**
     * Styles applied to the root element if zeroMinWidth={true}.
     */
    zeroMinWidth: PropTypes.string,
    /**
     * Styles related to column direction.
     */
    "direction-xs-column": PropTypes.string,
    /**
     * Styles related to column direction.
     */
    "direction-xs-reverse": PropTypes.string,
    /**
     * Styles related to column direction.
     */
    "direction-xs-row-reverse": PropTypes.string,
    /**
     * Styles related to wrapping.
     */
    "wrap-xs-nowrap": PropTypes.string,
    /**
     * Styles related to wrapping.
     */
    "wrap-xs-wrap-reverse": PropTypes.string,
    /**
     * Styles related to alignment.
     */
    "align-items-xs-center": PropTypes.string,
    /**
     * Styles related to alignment.
     */
    "align-items-xs-flex-start": PropTypes.string,
    /**
     * Styles related to alignment.
     */
    "align-items-xs-flex-end": PropTypes.string,
    /**
     * Styles related to alignment.
     */
    "align-items-xs-baseline": PropTypes.string,
    /**
     * Styles related to alignment.
     */
    "align-content-xs-center": PropTypes.string,
    /**
     * Styles related to alignment.
     */
    "align-content-xs-flex-start": PropTypes.string,
    /**
     * Styles related to alignment.
     */
    "align-content-xs-flex-end": PropTypes.string,
    /**
     * Styles related to alignment.
     */
    "align-content-xs-space-between": PropTypes.string,
    /**
     * Styles related to alignment.
     */
    "align-content-xs-space-around": PropTypes.string,
    /**
     * Styles related to content justification.
     */
    "justify-xs-center": PropTypes.string,
    /**
     * Styles related to content justification.
     */
    "justify-xs-flex-end": PropTypes.string,
    /**
     * Styles related to content justification.
     */
    "justify-xs-space-between": PropTypes.string,
    /**
     * Styles related to content justification.
     */
    "justify-xs-space-around": PropTypes.string,
    /**
     * Styles related to content justification.
     */
    "justify-xs-space-evenly": PropTypes.string,
    /**
     * Styles related to spacing.
     */
    "spacing-xs-1": PropTypes.string,
    /**
     * Styles related to spacing.
     */
    "spacing-xs-2": PropTypes.string,
    /**
     * Styles related to spacing.
     */
    "spacing-xs-3": PropTypes.string,
    /**
     * Styles related to spacing.
     */
    "spacing-xs-4": PropTypes.string,
    /**
     * Styles related to spacing.
     */
    "spacing-xs-5": PropTypes.string,
    /**
     * Styles related to spacing.
     */
    "spacing-xs-6": PropTypes.string,
    /**
     * Styles related to spacing.
     */
    "spacing-xs-7": PropTypes.string,
    /**
     * Styles related to spacing.
     */
    "spacing-xs-8": PropTypes.string,
    /**
     * Styles related to spacing.
     */
    "spacing-xs-9": PropTypes.string,
    /**
     * Styles related to spacing.
     */
    "spacing-xs-10": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-auto": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-true": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-1": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-2": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-3": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-4": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-5": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-6": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-7": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-8": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-9": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-10": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-11": PropTypes.string,
    /**
     * Styles related to grid sizing.
     */
    "grid-xs-12": PropTypes.string,
  }).isRequired,
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
  direction: PropTypes.oneOf(["row", "row-reverse", "column", "column-reverse"]),
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
    "space-evenly",
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg: PropTypes.oneOf([false, "auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md: PropTypes.oneOf([false, "auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm: PropTypes.oneOf([false, "auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the space between the type item component. It can only be used on a type container component.
   * Based in the 7.5px factor defined in the theme, it allows the definition of this factor based on the factor
   * (number between 0 and 10), breakpoint or auto.
   */
  spacing: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "auto", ...SPACINGS]),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap: PropTypes.oneOf(["nowrap", "wrap", "wrap-reverse"]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl: PropTypes.oneOf([false, "auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs: PropTypes.oneOf([false, "auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth: PropTypes.bool,
};

export default withStyles({}, { name: "HvGrid" })(HvGrid);
