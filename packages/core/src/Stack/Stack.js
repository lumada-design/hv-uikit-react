import React, { useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles, Divider, useTheme } from "@material-ui/core";
import isString from "lodash/isString";
import isBoolean from "lodash/isBoolean";
import styles from "./styles";
import useWidth from "../utils/useWidth";
import Focus from "../Focus";

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
 * It also allows the specification of the spacing between the stack elements and the adition of a divider between the elements.
 */
const HvStack = ({
  classes,
  children,
  direction = "column",
  spacing = "sm",
  divider = false,
  withNavigation = false,
  dividerProps = {},
  ...others
}) => {
  const width = useWidth();
  const theme = useTheme();
  const containerRef = useRef(null);

  const breakpoints = useMemo(() => [...theme.breakpoints.keys], [theme]);

  const processedDirection = useMemo(
    () => getDirection(direction, width, breakpoints),
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
        <Divider
          orientation={processedDirection === "column" ? "horizontal" : "vertical"}
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
      className={clsx(classes.root, classes[processedDirection], classes[spacing])}
      {...others}
    >
      {React.Children.map(children, (child, i) => {
        return (
          <>
            {divider && i !== 0 && getDividerComponent(divider, processedDirection)}
            {withNavigation ? (
              <Focus
                rootRef={containerRef}
                focusDisabled={false}
                strategy="grid"
                navigationJump={processedDirection === "column" ? 1 : children.length}
                filterClass="child"
              >
                <div className="child">{child}</div>
              </Focus>
            ) : (
              child
            )}
          </>
        );
      })}
    </div>
  );
};

HvStack.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the radio button.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component.
     */
    root: PropTypes.string,
  }).isRequired,
  /**
   * Children of the stack component.
   */
  children: PropTypes.node,
  /**
   * The direction of the stack.
   * Can be either a string or an object that states the direction for each breakpoint.
   */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(["column", "row"]),
    PropTypes.shape({
      xs: PropTypes.string,
      sm: PropTypes.string,
      md: PropTypes.string,
      lg: PropTypes.string,
      xl: PropTypes.string,
    }),
  ]),
  /**
   * The spacing between elements of the stack.
   */
  spacing: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  /**
   * The divider component to be used between the stack elements.
   *
   * - If `true` the Material-UI Divider component will be used.
   *
   * - If a React node is passed then the custom divider will be used.
   */
  divider: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  /**
   * The properties to pass on to the Material-UI component.
   */
  dividerProps: PropTypes.object,
  /**
   * Sets whether or not there should be arrow navigation between the stack elements
   */
  withNavigation: PropTypes.bool,
};

export default withStyles(styles, { name: "HvStack" })(HvStack);
