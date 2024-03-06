import React, { useMemo, useRef, useCallback } from "react";

import { useTheme } from "@mui/material/styles";
import MuiDivider, {
  DividerProps as MuiDividerProps,
} from "@mui/material/Divider";

import { HvBreakpoints } from "@hitachivantara/uikit-styles";

import { useWidth } from "../hooks/useWidth";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvBaseProps } from "../types/generic";
import { HvFocus } from "../Focus";
import { ExtractNames } from "../utils/classes";

import { useClasses, staticClasses } from "./Stack.styles";

export { staticClasses as stackClasses };

export type HvStackClasses = ExtractNames<typeof useClasses>;

export type HvStackDirection = "column" | "row" | Partial<HvStackBreakpoints>;
export interface HvStackBreakpoints extends Record<HvBreakpoints, string> {}

export interface HvStackProps extends HvBaseProps {
  /** The direction of the stack. Can be either a string or an object that states the direction for each breakpoint. */
  direction?: HvStackDirection;
  /** The spacing between elements of the stack. */
  spacing?: HvBreakpoints;
  /** The divider component to be used between the stack elements.
   * - If `true` the Material-UI Divider component will be used.
   * - If a React node is passed then the custom divider will be used.
   */
  divider?: boolean | React.ReactNode;
  /** The properties to pass on to the Material-UI component. */
  dividerProps?: MuiDividerProps;
  /** Sets whether or not there should be arrow navigation between the stack elements. */
  withNavigation?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvStackClasses;
}

/**
 * @returns {string} - Returns a direction for the stack: column or row. If the
 *                     `direction` property is a string and a valid direction then we
 *                     use it. If it's an object with multiple directions by breakpoint
 *                     we use the appropriate one or search for the nearest breakpoint
 *                     smaller than the current one to use.
 */
const getDirection = (direction: any, width: any, breakpoints: any) => {
  if (typeof direction === "string") return direction;

  for (let i = breakpoints.indexOf(width); i >= 0; i -= 1) {
    if (direction[breakpoints[i]] !== undefined) {
      return direction[breakpoints[i]];
    }
  }
  return "column";
};

/**
 * A Stack component allows the organization of its children in a vertical or horizontal layout.
 *
 * It also allows the specification of the spacing between the stack elements and the addition of a divider between the elements.
 */
export const HvStack = (props: HvStackProps) => {
  const {
    classes: classesProp,
    className,
    children,
    direction = "column",
    spacing = "sm",
    divider = false,
    withNavigation = false,
    dividerProps = {},
    ...others
  } = useDefaultProps("HvStack", props);
  const { classes, cx } = useClasses(classesProp);

  const width = useWidth();
  const containerRef = useRef(null);
  const { breakpoints } = useTheme();

  const processedDirection = useMemo(
    () => getDirection(direction, width, breakpoints.keys),
    [direction, width, breakpoints]
  );

  /**
   * @returns {node} - The divider component to use. If the property `divider` is
   *                   set to `true` then the Material-UI divider is used, otherwise
   *                   we use the custom divider the user passed.
   */
  const getDividerComponent = useCallback(() => {
    if (typeof divider === "boolean" && divider) {
      return (
        <MuiDivider
          orientation={
            processedDirection === "column" ? "horizontal" : "vertical"
          }
          flexItem={processedDirection === "row"}
          role="separator"
          {...dividerProps}
        />
      );
    }
    return divider;
  }, [divider, dividerProps, processedDirection]);

  return (
    <div
      ref={containerRef}
      className={cx(
        classes.root,
        classes[processedDirection],
        classes[spacing],
        className
      )}
      {...others}
    >
      {React.Children.map(children, (child, i) => {
        return (
          <>
            {divider && i !== 0 && getDividerComponent()}
            {withNavigation ? (
              <HvFocus
                rootRef={containerRef}
                focusDisabled={false}
                strategy="grid"
                navigationJump={
                  processedDirection === "column"
                    ? 1
                    : React.Children.count(children) || 0
                }
                filterClass="child"
              >
                <div className="child">{child}</div>
              </HvFocus>
            ) : (
              child
            )}
          </>
        );
      })}
    </div>
  );
};
