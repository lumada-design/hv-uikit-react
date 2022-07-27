import React from "react";
import PropTypes from "prop-types";

import { useTheme, withStyles } from "@material-ui/core";

import HvDot from "./Dot";
import { defaultColor, disabledColor, dotSizes } from "./utils";
import styles from "./styles";

/**
 * Simple Navigation
 */
const HvSimpleNavigation = ({
  numSteps,
  stepSize,
  getTitles,
  getDynamicValues,
  children,
  ...other
}) => {
  const theme = useTheme();

  // step values
  const dotSize = dotSizes[stepSize];
  const StepComponent = HvDot;
  //

  const stepsWidth = (numSteps + 0.5) * dotSize;
  const { width, titleWidth, separatorWidth } = getDynamicValues(stepsWidth);

  // separator values
  const getColor = (state) =>
    ["Current", "Disabled"].includes(state) ? disabledColor(theme) : defaultColor(theme);
  const maxWidth = Math.max(titleWidth - dotSize, separatorWidth);
  const minWidth = Math.max(titleWidth - dotSize * 1.25, separatorWidth);
  //

  const Steps = children;

  const titles = getTitles(({ rawTitle, number }) => ({
    title: `${number}. ${rawTitle}`,
    titleWidth,
  }));

  return (
    <div {...other}>
      {titles}
      <Steps
        {...{
          stepsWidth,
          navWidth: width,
          separatorValues: {
            minWidth,
            maxWidth,
            getColor,
            height: 2,
          },
          stepValues: {
            minSize: dotSize,
            maxSize: 1.5 * dotSize,
            StepComponent,
          },
        }}
      />
    </div>
  );
};

HvSimpleNavigation.propTypes = {
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

export default withStyles(styles, { name: "HvSimpleNavigation" })(HvSimpleNavigation);
