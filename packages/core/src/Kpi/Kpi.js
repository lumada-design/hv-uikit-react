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
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import classNames from "classnames";
import HvTypography from "../Typography";

const HvKpi = props => {
  const {
    classes,
    className,
    id,
    kpiTextConfiguration,
    labels,
    visualIndicator,
    visualComparison
  } = props;

  const definedLabels = kpiTextConfiguration || labels;

  return (
    <div id={id} className={classNames(classes.kpiContainer, className)}>
      <div>
        <HvTypography variant="labelText">{definedLabels.title}</HvTypography>
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
          {definedLabels.indicator}
        </HvTypography>
        <HvTypography className={classes.indicatorUnit} variant="infoText">
          {definedLabels.unit}
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
          {definedLabels.comparisonIndicatorInfo}
        </HvTypography>
      </div>
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
  })
};

HvKpi.defaultProps = {
  className: "",
  id: undefined,
  visualIndicator: null,
  visualComparison: null,
  labels: {
    title: "",
    indicator: "",
    unit: "",
    comparisonIndicatorInfo: ""
  },
  kpiTextConfiguration: undefined
};

export default HvKpi;
