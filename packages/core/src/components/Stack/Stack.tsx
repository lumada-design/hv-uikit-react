import React, { useMemo, useRef, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import MuiDivider, {
  DividerProps as MuiDividerProps,
} from "@mui/material/Divider";
import clsx from "clsx";
import isString from "lodash/isString";
import isBoolean from "lodash/isBoolean";
import { useWidth } from "hooks";
import { HvBaseProps } from "../../types";
import { StyledRoot } from "./Stack.styles";
import { HvFocus } from "components";
import { HvBreakpoints } from "types/tokens";
import stackClasses, { HvStackClasses } from "./stackClasses";

export type HvStackDirection = "column" | "row" | Partial<HvStackBreakpoints>;
export type HvStackBreakpoints = Record<HvBreakpoints, string>;

export type HvStackProps = HvBaseProps & {
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
};

/**
 * @returns {string} - Returns a direction for the stack: column or row. If the
 *                     `direction` property is a string and a valid direction then we
 *                     use it. If it's an object with multiple directions by breakpoint
 *                     we use the appropriate one or search for the nearest breakpoint
 *                     smaller than the current one to use.
 */
const getDirection = (direction, width, breakpoints) => {
  if (isString(direction)) return direction;

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
export const HvStack = ({
  classes,
  className,
  children,
  direction = "column",
  spacing = "sm",
  divider = false,
  withNavigation = false,
  dividerProps = {},
  ...others
}: HvStackProps) => {
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
    if (isBoolean(divider) && divider) {
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
    <StyledRoot
      ref={containerRef}
      className={clsx(className, stackClasses.root, classes?.root)}
      $direction={processedDirection}
      $breakpoint={spacing}
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
    </StyledRoot>
  );
};
