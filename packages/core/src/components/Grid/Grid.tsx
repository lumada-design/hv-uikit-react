import { Grid as MuiGrid, GridProps as MuiGridProps } from "@mui/material";
import { isString } from "lodash";
import { forwardRef } from "react";
import { useWidth } from "hooks";
import { HvBaseProps } from "../../types";
import { HvGridClasses } from "./gridClasses";

const BREAKPOINT_GUTTERS = {
  xs: 2,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
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

export type HvGridProps = MuiGridProps &
  HvBaseProps & {
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
  };

/**
 * The grid creates visual consistency between layouts while allowing flexibility
 * across a wide variety of designs. This component is based in a 12-column grid layout.
 *
 * It is is based in the [Material UI Grid]https://mui.com/material-ui/react-grid/).
 *
 * The definitions were set following the Design System directives:
 *
 * | Breakpoint | Width (in px) | Gutters (in px) | Number of columns |
 * | ---------- | ------------- | --------------- | ----------------- |
 * | xs         | [0-575[       | 16              | 4                 |
 * | sm         | [576-767[     | 16              | 8                 |
 * | md         | [768-991[     | 32              | 12                |
 * | lg         | [992-1199[    | 32              | 12                |
 * | xl         | [1200-...[    | 32              | 12                |
 *
 */
export const HvGrid = forwardRef<HTMLDivElement, HvGridProps>(
  ({ container, spacing = "auto", ...others }, ref) => {
    const width = useWidth();
    let gridSpacing = spacing;

    if (isString(spacing)) {
      if (spacing === "auto") {
        gridSpacing = BREAKPOINT_GUTTERS[width];
      } else {
        gridSpacing = BREAKPOINT_GUTTERS[spacing];
      }
    }

    return (
      <MuiGrid
        ref={ref}
        {...(container && { container, spacing: gridSpacing })}
        {...others}
      />
    );
  }
);
