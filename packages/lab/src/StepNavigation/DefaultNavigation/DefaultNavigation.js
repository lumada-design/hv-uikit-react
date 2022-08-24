import React from "react";
import PropTypes from "prop-types";

import { useTheme } from "@mui/material";
import { withStyles } from "@mui/styles";

import HvStep from "./Step";
import { getColor as getStateColor, stepSizes } from "./utils";
import styles from "./styles";

/**
 * Default Navigation
 */
const HvDefaultNavigation = ({
  numSteps,
  stepSize,
  getTitles,
  getDynamicValues,
  children,
  ...other
}) => {
  const theme = useTheme();

  // step values
  const { container: maxSize, avatar: minSize } = stepSizes[stepSize];
  const StepComponent = HvStep;
  //

  const stepsWidth = maxSize + minSize * (numSteps - 1);
  const { width, titleWidth, separatorWidth } = getDynamicValues(stepsWidth);

  // separator values
  const getColor = (state) => getStateColor(state === "Current" ? "Disabled" : state, theme);
  const maxWidth = Math.max(titleWidth - minSize, separatorWidth);
  const minWidth = Math.max(titleWidth - (maxSize + minSize) * 0.5, separatorWidth);
  //

  const Steps = children;

  const titles = getTitles(({ state }) => ({
    variant: state === "Disabled" ? "disabledText" : "highlightText",
    titleWidth,
  }));

  return (
    <div {...other}>
      <Steps
        {...{
          stepsWidth,
          navWidth: width,
          separatorValues: {
            minWidth,
            maxWidth,
            getColor,
            height: 3,
          },
          stepValues: {
            minSize,
            maxSize,
            StepComponent,
          },
        }}
      />
      {titles}
    </div>
  );
};

HvDefaultNavigation.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
  }).isRequired,
  /**
   * Number of steps to show on the component.
   */
  numSteps: PropTypes.number.isRequired,
  /**
   * Sets one of the standard sizes of the steps
   */
  stepSize: PropTypes.oneOf(["XS", "SM", "MD", "LG", "XL"]).isRequired,
  /**
   * Returns dynamic width values of the component (width, titleWidth, separatorWidth).
   */
  getDynamicValues: PropTypes.func.isRequired,
  /**
   * Returns a JSX.element of the titles container.
   */
  getTitles: PropTypes.func.isRequired,
  /**
   * Component to render Step Navigation with props = {separatorValues, stepValues, stepsWidth}
   */
  children: PropTypes.elementType.isRequired,
};

export default withStyles(styles, { name: "HvDefaultNavigation" })(HvDefaultNavigation);
