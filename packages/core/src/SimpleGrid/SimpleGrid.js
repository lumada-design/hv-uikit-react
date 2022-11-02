import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import useStyles from "./styles";

/**
 * SimpleGrid is a flexbox container where each child is treated as a column.
 * Each column takes equal amount of space.
 */
const HvSimpleGrid = ({ children, breakpoints, spacing = "sm", cols, ...others }) => {
  const classes = useStyles({ breakpoints, cols, spacing })();
  return (
    <div className={classes.container} {...others}>
      {children}
    </div>
  );
};

HvSimpleGrid.propTypes = {
  /**
   * -
   */
  children: PropTypes.node,
  /**
   * Spacing with pre-defined values according the values defined in the theme
   */
  spacing: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  /**
   * Provide an array to define responsive behavior:
   *
   *    maxWidth or minWidth: max-width or min-width at which media query will work
   *
   *    cols: number of columns per row at given max-width
   *
   *    spacing: optional spacing at given max-width, if not provided spacing from component prop will be used instead
   */
  breakpoints: PropTypes.arrayOf(
    PropTypes.shape({
      maxWidth: PropTypes.number,
      minWidth: PropTypes.number,
      cols: PropTypes.number,
      spacing: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    })
  ),
  /**
   * Number of how many columns the content will be displayed
   */
  cols: PropTypes.number,
};

export default withStyles(useStyles, { name: "HvSimpleGrid" })(HvSimpleGrid);
