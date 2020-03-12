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

  return (
    <Grid {...(container && { container, spacing: gridSpacing })} {...other} />
  );
};

HvGrid.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |   To update them edit the d.ts file and run "npm run proptypes"    |
  // ----------------------------------------------------------------------
  /**
   * Defines the space between the type item component. It can only be used on a type container component.
   * Based in the 7.5px factor defined in the theme, it allows the definition of this factor based on the factor
   * (number between 0 and 10), breakpoint or auto.
   */
  gutterSpacing: PropTypes.oneOfType([
    PropTypes.oneOf(["auto", "lg", "md", "sm", "xl", "xs"]),
    PropTypes.number
  ]),
  /**
   * @ignore
   */
  container: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node
};

export default withStyles({}, { name: "HvGrid" })(HvGrid);
