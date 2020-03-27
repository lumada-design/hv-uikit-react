/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isNil from "lodash/isNil";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const BREAKPOINT_GUTTERS = {
  xs: 15,
  sm: 15,
  md: 30,
  lg: 30,
  xl: 30
};

const Grid = React.forwardRef((props, ref) => {
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
    // passed automatically withTheme
    // eslint-disable-next-line react/prop-types
    theme,
    // passed automatically withWidth
    // eslint-disable-next-line react/prop-types
    width,
    ...other
  } = props;

  const breakpointSpacing = !isNil(spacing)
    ? spacing
    : BREAKPOINT_GUTTERS[width];

  const className = classNames(
    classes.root,
    {
      [classes.container]: container,
      [classes.item]: item,
      [classes.zeroMinWidth]: zeroMinWidth,
      [classes[`spacing-xs-${String(breakpointSpacing)}`]]:
        container && breakpointSpacing !== 0,
      [classes[`direction-xs-${String(direction)}`]]:
        direction !== Grid.defaultProps.direction,
      [classes[`wrap-xs-${String(wrap)}`]]: wrap !== Grid.defaultProps.wrap,
      [classes[`align-items-xs-${String(alignItems)}`]]:
        alignItems !== Grid.defaultProps.alignItems,
      [classes[`align-content-xs-${String(alignContent)}`]]:
        alignContent !== Grid.defaultProps.alignContent,
      [classes[`justify-xs-${String(justify)}`]]:
        justify !== Grid.defaultProps.justify,
      [classes[`grid-xs-${String(xs)}`]]: xs !== "false",
      [classes[`grid-sm-${String(sm)}`]]: sm !== "false",
      [classes[`grid-md-${String(md)}`]]: md !== "false",
      [classes[`grid-lg-${String(lg)}`]]: lg !== "false",
      [classes[`grid-xl-${String(xl)}`]]: xl !== "false"
    },
    classNameProp
  );
  return (
    <Component
      className={className}
      ref={ref}
      xs={container && !xs ? 4 : xs}
      sm={container && !sm ? 8 : sm}
      md={container && !md ? 12 : md}
      lg={container && !lg ? 12 : lg}
      xl={container && !xl ? 12 : xl}
      {...other}
    />
  );
});

if (process.env.NODE_ENV !== "production") {
  // can't use named function expression since the function body references `Grid`
  // which would point to the render function instead of the actual component
  Grid.displayName = "ForwardRef(Grid)";
}

Grid.propTypes = {
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
  xs: PropTypes.oneOf([
    "false",
    "auto",
    "true",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm: PropTypes.oneOf([
    "false",
    "auto",
    "true",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md: PropTypes.oneOf([
    "false",
    "auto",
    "true",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg: PropTypes.oneOf([
    "false",
    "auto",
    "true",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl: PropTypes.oneOf([
    "false",
    "auto",
    "true",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12
  ]),
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  spacing: PropTypes.oneOf([0, 8, 15, 16, 24, 30, 32, 40]),
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

Grid.defaultProps = {
  alignContent: "stretch",
  alignItems: "stretch",
  component: "div",
  container: false,
  direction: "row",
  item: false,
  justify: "flex-start",
  lg: "false",
  md: "false",
  sm: "false",
  spacing: undefined,
  wrap: "wrap",
  xl: "false",
  xs: "false",
  zeroMinWidth: false,
  className: undefined,
  children: undefined
};

export default withStyles(styles, { name: "HvGrid" })(Grid);
