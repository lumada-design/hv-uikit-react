import React from "react";
import PropTypes from "prop-types";
import useStyles from "./styles";

const SimpleGrid = ({ children, breakpoints, spacing = "sm", cols, ...others }) => {
  const classes = useStyles({ breakpoints, cols, spacing })();
  return (
    <div className={classes.container} {...others}>
      {children}
    </div>
  );
};

SimpleGrid.propTypes = {
  /**
   * -
   */
  children: PropTypes.node,
  /**
   * Spacing with pre-defined values according the values defined in the theme
   */
  spacing: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
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
      spacing: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    })
  ),
  /**
   * Number of how many columns the content will be displayed
   */
  cols: PropTypes.number,
};

export default SimpleGrid;
