import React from "react";
import PropTypes from "prop-types";
import isString from "lodash/isString";
import { withStyles, Grid } from "@material-ui/core";
import useWidth from "../utils/useWidth";

const BREAKPOINT_GUTTERS = {
  xs: 1,
  sm: 1,
  md: 2,
  lg: 2,
  xl: 2
};

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const HvGrid = ({ container, gutterSpacing = "auto", ...other }) => {
  const width = useWidth();
  let gridSpacing = gutterSpacing;

  if (isString(gutterSpacing)) {
    if (gutterSpacing === "auto") {
      gridSpacing = BREAKPOINT_GUTTERS[width];
    } else {
      gridSpacing = BREAKPOINT_GUTTERS[gutterSpacing];
    }
  }

  return <Grid {...(container && { container, spacing: gridSpacing })} {...other} />;
};

HvGrid.propTypes = {
  /**
   * Defines the space between the type item component. It can only be used on a type container component.
   * Based in the 7.5px factor defined in the theme, it allows the definition of this factor based on the factor
   * (number between 0 and 10), breakpoint or auto.
   */
  gutterSpacing: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "auto", ...SPACINGS]),
  /**
   * @ignore
   */
  container: PropTypes.bool
};

export default withStyles({}, { name: "HvGrid" })(HvGrid);
