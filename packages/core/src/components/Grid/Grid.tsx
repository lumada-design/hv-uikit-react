import { Grid as MuiGrid, GridProps as MuiGridProps } from "@mui/material";

import isString from "lodash/isString";

import { forwardRef } from "react";

import { HvBaseProps } from "@core/types/generic";
import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Grid.styles";

export { staticClasses as gridClasses };

export type HvGridClasses = ExtractNames<typeof useClasses>;

const BREAKPOINT_GUTTERS = {
  xs: 2,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
};

const BREAKPOINT_COLUMNS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 12,
  xl: 12,
};

export type HvGridDirection =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse";

export type HvGridSpacing =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "auto"
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10;

export interface HvGridProps
  extends Omit<MuiGridProps, "classes" | "columns">,
    HvBaseProps<HTMLDivElement, "color"> {
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   */
  container?: boolean;
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item?: boolean;
  /**
   * Defines the space between the type item component. It can only be used on a type container component.
   * Based in the 8x factor defined in the theme, it allows the definition of this factor based on the factor
   * (number between 0 and 10), breakpoint or auto.
   */
  spacing?: HvGridSpacing | number;
  /**
   * Defines the vertical space between the type item component. It can only be used on a type container component.
   * Based in the 8x factor defined in the theme, it allows the definition of this factor based on the factor
   * (number between 0 and 10), breakpoint or auto.
   * It overrides the value of the spacing prop.
   */
  rowSpacing?: HvGridSpacing | number;
  /**
   * Defines the horizontal space between the type item component. It can only be used on a type container component.
   * Based in the 8x factor defined in the theme, it allows the definition of this factor based on the factor
   * (number between 0 and 10), breakpoint or auto.
   * It overrides the value of the spacing prop.
   */
  columnSpacing?: HvGridSpacing | number;
  /**
   * The number of columns.
   * Defaults to a 12-column grid.
   * The value "auto" implements the Design System directives in terms of variable number of columns.
   * @default 12
   */
  columns?: "auto" | MuiGridProps["columns"];
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   */
  direction?: HvGridDirection;
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   */
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs?: number | boolean;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm?: number | boolean;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md?: number | boolean;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg?: number | boolean;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl?: number | boolean;
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvGridClasses;
}

function getGridSpacing(spacing: HvGridProps["spacing"]) {
  let gridSpacing: MuiGridProps["spacing"];

  if (isString(spacing)) {
    if (spacing === "auto") {
      gridSpacing = BREAKPOINT_GUTTERS;
    } else {
      gridSpacing = BREAKPOINT_GUTTERS[spacing];
    }
  } else if (typeof spacing === "object") {
    gridSpacing = Object.keys(spacing).reduce(
      (acc, breakpoint) => ({
        ...acc,
        [breakpoint]:
          BREAKPOINT_GUTTERS[spacing[breakpoint]] ?? spacing[breakpoint],
      }),
      {}
    );
  } else if (spacing === 0) {
    gridSpacing = { xs: 0 };
  } else {
    gridSpacing = spacing;
  }

  return gridSpacing;
}

function getNumberOfColumns(columns: HvGridProps["columns"]) {
  let numberOfColumns: MuiGridProps["columns"];

  if (columns === "auto") {
    numberOfColumns = BREAKPOINT_COLUMNS;
  } else {
    numberOfColumns = columns;
  }

  return numberOfColumns;
}

/**
 * The grid creates visual consistency between layouts while allowing flexibility
 * across a wide variety of designs. This component is based on a 12-column grid layout.
 *
 * It's based on the [Material UI Grid](https://mui.com/material-ui/react-grid/).
 *
 * The definitions were set following the Design System directives:
 *
 * | Breakpoint | Width (in px) | Gutters (in px) | Number of columns |
 * | ---------- | ------------- | --------------- | ----------------- |
 * | xs         | [0-600[       | 16              | 4                 |
 * | sm         | [600-960[     | 16              | 8                 |
 * | md         | [960-1270[     | 32              | 12                |
 * | lg         | [1270-1920[    | 32              | 12                |
 * | xl         | [1920-...[    | 32              | 12                |
 *
 * However, the number of columns is set to 12 for all breakpoints, as it serves most
 * of the use cases and simplifies the implementation.
 * To opt-in to the Design System directives, you can set the `columns` prop to `auto`.
 *
 * Also, the Design System specifications are omissive about the horizontal gutters.
 * The HvGrid sets them to the same value as the vertical gutters, depending on the breakpoint.
 * It can be overridden by setting the `rowSpacing` prop.
 */
export const HvGrid = forwardRef<HTMLDivElement, HvGridProps>((props, ref) => {
  const {
    container,
    spacing = "auto",
    rowSpacing,
    columnSpacing,
    columns,
    classes: classesProp,
    ...others
  } = useDefaultProps("HvGrid", props);

  const { classes } = useClasses(classesProp);

  const containerProps: Pick<
    MuiGridProps,
    "container" | "spacing" | "rowSpacing" | "columnSpacing" | "columns"
  > = {};

  if (container) {
    containerProps.container = true;

    if (spacing != null) {
      containerProps.spacing = getGridSpacing(spacing);
    }
    if (rowSpacing != null) {
      containerProps.rowSpacing = getGridSpacing(rowSpacing);
    }
    if (columnSpacing != null) {
      containerProps.columnSpacing = getGridSpacing(columnSpacing);
    }
    if (columns != null) {
      containerProps.columns = getNumberOfColumns(columns);
    }
  }

  return (
    <MuiGrid ref={ref} classes={classes} {...containerProps} {...others} />
  );
});
