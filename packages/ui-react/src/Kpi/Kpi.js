/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
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
   * A Jss Object used to override or extend the styles applied to the button.
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
    }).isRequired
};

HvKpi.defaultProps = {
  visualIndicator: null,
  visualComparison: null
};

export default HvKpi;
