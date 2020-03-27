/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import classNames from "classnames";
import HvTypography from "../Typography";

import styles from "./styles";

const HvKpi = props => {
  const {
    classes,
    className,
    id,
    kpiTextConfiguration,
    labels,
    visualIndicator,
    visualComparison,
    trendIndicator,
    indicatorUnitTextVariant,
    indicatorTextVariant,
    ...other
  } = props;

  const definedLabels = kpiTextConfiguration || labels;

  const InternalVisualComparison =
    typeof visualComparison === "string" ? HvTypography : "div";

  return (
    <div
      id={id}
      className={classNames(classes.kpiContainer, className)}
      {...other}
    >
      <div>
        <HvTypography variant="highlightText">
          {definedLabels.title}
        </HvTypography>
      </div>
      <div className={classes.indicatorsContainer}>
        {visualIndicator != null && (
          <div
            className={classNames(
              classes.visualIndicatorContainer,
              classes.spacingToTheRight
            )}
          >
            {visualIndicator}
          </div>
        )}
        <HvTypography
          className={classNames(
            classes.spacingToTheRight,
            classes.indicatorText
          )}
          variant={indicatorTextVariant}
        >
          {definedLabels.indicator}
        </HvTypography>
        <HvTypography
          className={classes.indicatorUnit}
          variant={indicatorUnitTextVariant}
        >
          {definedLabels.unit}
        </HvTypography>
      </div>
      {visualComparison != null && (
        <div className={classes.comparisonComposition}>
          {trendIndicator != null && (
            <div
              className={classNames(
                classes.trendLine,
                classes.spacingToTheRight
              )}
            >
              {trendIndicator}
            </div>
          )}
          <div>
            <div className={classes.comparisonContainer}>
              <InternalVisualComparison
                className={classNames(
                  classes.comparisons,
                  classes.spacingToTheRight
                )}
                variant="highlightText"
              >
                {visualComparison}
              </InternalVisualComparison>
            </div>
            <div className={classes.comparisonContainer}>
              <HvTypography className={classes.comparisons} variant="vizText">
                {definedLabels.comparisonIndicatorInfo}
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
    comparisonContainer: PropTypes.string,
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
     * Styles applied to the component visual comparison.
     */
    comparisons: PropTypes.string
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
   * @deprecated Instead use the labels property
   */
  kpiTextConfiguration: deprecatedPropType(
    PropTypes.shape({
      title: PropTypes.string,
      indicator: PropTypes.string,
      unit: PropTypes.string,
      comparisonIndicatorInfo: PropTypes.string
    }),
    "Instead use the labels property"
  ),
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
  indicatorUnitTextVariant: "sTitle",
  kpiTextConfiguration: undefined
};

export default withStyles(styles, { name: "HvKpi" })(HvKpi);
