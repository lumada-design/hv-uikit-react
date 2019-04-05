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
import Typography from "@material-ui/core/Typography";

const HvKpi = props => {
  const {
    classes,
    kpiTextConfiguration,
    visualIndicator,
    visualComparison
  } = props;

  return (
    <div className={classes.kpiContainer}>
      <Typography className={classes.titleText} variant="subtitle2">{kpiTextConfiguration.title}</Typography>
      <div className={classes.indicatorsContainer}>
        { 
          visualIndicator != null &&
          <div className={classNames(classes.visualIndicatorContainer, classes.spacingToTheRight)}>{visualIndicator}</div>
        }
        <Typography className={classNames(classes.indicatorText, classes.spacingToTheRight)} variant="h1">{kpiTextConfiguration.indicator}</Typography>
        <Typography className={classes.indicatorUnit} variant="body2">{kpiTextConfiguration.unit}</Typography>
      </div>
      <div className={classes.comparisonContainer}>
        { 
          visualComparison != null &&
          <div className={classNames(classes.comparisons, classes.visualComparisonContainer, classes.spacingToTheRight)}>{visualComparison}</div>
        }
        <Typography className={classNames(classes.comparisons, classes.infoText)}>{kpiTextConfiguration.comparisonIndicatorInfo}</Typography>
      </div>
    </div>
  );
};

HvKpi.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
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
      comparisonIndicatorInfo: PropTypes.string,
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
