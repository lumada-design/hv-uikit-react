import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import HvTypography from "../Typography";
import styles from "./styles";

const HvKpi = props => {
  const {
    classes,
    className,
    id,
    labels,
    visualIndicator,
    visualComparison,
    trendIndicator,
    indicatorUnitTextVariant,
    indicatorTextVariant,
    ...other
  } = props;

  const InternalVisualComparison =
    typeof visualComparison === "string" ? HvTypography : "div";

  return (
    <div id={id} className={clsx(classes.kpiContainer, className)} {...other}>
      <div>
        <HvTypography variant="highlightText">{labels.title}</HvTypography>
      </div>
      <div className={classes.indicatorsContainer}>
        {visualIndicator != null && (
          <div
            className={clsx(
              classes.visualIndicatorContainer,
              classes.spacingToTheRight
            )}
          >
            {visualIndicator}
          </div>
        )}
        <HvTypography
          className={clsx(classes.spacingToTheRight, classes.indicatorText)}
          variant={indicatorTextVariant}
        >
          {labels.indicator}
        </HvTypography>
        <HvTypography
          className={classes.indicatorUnit}
          variant={indicatorUnitTextVariant}
        >
          {labels.unit}
        </HvTypography>
      </div>
      {visualComparison != null && (
        <div className={classes.comparisonComposition}>
          {trendIndicator != null && (
            <div className={clsx(classes.trendLine, classes.spacingToTheRight)}>
              {trendIndicator}
            </div>
          )}
          <div>
            <div className={classes.comparisonContainer}>
              <InternalVisualComparison
                className={clsx(classes.comparisons, classes.spacingToTheRight)}
                variant="highlightText"
              >
                {visualComparison}
              </InternalVisualComparison>
            </div>
            <div className={classes.comparisonContainer}>
              <HvTypography className={classes.comparisons} variant="vizText">
                {labels.comparisonIndicatorInfo}
              </HvTypography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

HvKpi.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    kpiContainer: PropTypes.string,
    /**
     * Styles applied to the component visual indicator.
     */
    visualIndicatorContainer: PropTypes.string,
    /**
     * Styles applied to the component comparison.
     */
    comparisons: PropTypes.string,
    /**
     * Styles applied to the component comparison container.
     */
    comparisonContainer: PropTypes.string,
    /**
     * Styles applied to the component comparison composition wrapper.
     */
    comparisonComposition: PropTypes.string,
    /**
     * Styles applied to the component indicators.
     */
    indicatorsContainer: PropTypes.string,
    /**
     * Styles applied to the component indicators text.
     */
    indicatorText: PropTypes.string,
    /**
     * Styles applied to the component indicators unit.
     */
    indicatorUnit: PropTypes.string,
    /**
     * Styles applied to the component comparison container right spacing.
     */
    spacingToTheRight: PropTypes.string,
    /**
     * Styles applied to the component trend line.
     */
    trendLine: PropTypes.string
  }).isRequired,
  /**
   * An Element that will be rendered to the left of the kpi indicator text.
   */
  trendIndicator: PropTypes.node,
  /**
   * An Element that will be rendered to the left of the kpi indicator text.
   */
  visualIndicator: PropTypes.node,
  /**
   * An Element that will be rendered below the kpi indicator text.
   */
  visualComparison: PropTypes.node,
  /**
   * The object that contains the different labels inside the kpi.
   *
   * - Title: The text at the top of the kpi.
   * - Indicator: The text in the middle of the kpi.
   * - Unit: The text to the right of the indicator.
   * - comparisonIndicatorInfo: the text to the right of the visual comparison.
   */
  labels: PropTypes.shape({
    title: PropTypes.string,
    indicator: PropTypes.string,
    unit: PropTypes.string,
    comparisonIndicatorInfo: PropTypes.string
  }),
  /**
   *  The typography variant used in the main text indicator of the KPI
   */
  indicatorTextVariant: PropTypes.oneOf([
    "5xlTitle",
    "xxlTitle",
    "lTitle",
    "sTitle"
  ]),
  /**
   *  The typography variant used in the main text indicator of the KPI
   */
  indicatorUnitTextVariant: PropTypes.oneOf(["sTitle", "sText", "infoText"])
};

HvKpi.defaultProps = {
  className: "",
  id: undefined,
  trendIndicator: null,
  visualIndicator: null,
  visualComparison: null,
  labels: {
    title: "",
    indicator: "",
    unit: "",
    comparisonIndicatorInfo: ""
  },
  indicatorTextVariant: "lTitle",
  indicatorUnitTextVariant: "sTitle"
};

export default withStyles(styles, { name: "HvKpi" })(HvKpi);
