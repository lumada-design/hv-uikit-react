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
import classNames from "classnames";
import HvTypography from "../Typography";

const HvKpi = props => {
  const {
    classes,
    kpiTextConfiguration,
    visualIndicator,
    visualComparison
  } = props;

  return (
    <div className={classes.kpiContainer}>
      <div>
        <HvTypography variant="labelText">
          {kpiTextConfiguration.title}
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
        <HvTypography className={classes.spacingToTheRight} variant="xlTitle">
          {kpiTextConfiguration.indicator}
        </HvTypography>
        <HvTypography className={classes.indicatorUnit} variant="infoText">
          {kpiTextConfiguration.unit}
        </HvTypography>
      </div>
      <div className={classes.comparisonContainer}>
        {visualComparison != null && (
          <HvTypography
            className={classNames(
              classes.comparisons,
              classes.spacingToTheRight
            )}
            variant="highlightText"
          >
            {visualComparison}
          </HvTypography>
        )}
        <HvTypography className={classes.comparisons} variant="vizText">
          {kpiTextConfiguration.comparisonIndicatorInfo}
        </HvTypography>
      </div>
    </div>
  );
};

HvKpi.propTypes = {
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
  kpiTextConfiguration: PropTypes.shape({
    title: PropTypes.string,
    indicator: PropTypes.string,
    unit: PropTypes.string,
    comparisonIndicatorInfo: PropTypes.string
  })
};

HvKpi.defaultProps = {
  visualIndicator: null,
  visualComparison: null,
  kpiTextConfiguration: {
    title: "",
    indicator: "",
    unit: "",
    comparisonIndicatorInfo: ""
  }
};

export default HvKpi;
