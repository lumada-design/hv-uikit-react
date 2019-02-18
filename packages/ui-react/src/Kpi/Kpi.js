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
    kpiTextConfiguration
  } = props;

  return (
    <div className={classes.kpiContainer}>
      <Typography variant="subtitle2">{kpiTextConfiguration.title}</Typography>
      <div className={classes.indicatorsContainer}>
        <Typography className={classNames(classes.indicator, classes.spacingToTheRight)} variant="h1">{kpiTextConfiguration.indicator}</Typography>
        <Typography className={classes.indicatorUnit} variant="body2">{kpiTextConfiguration.unit}</Typography>
      </div>
      <div className={classes.comparisonContainer}>
        <Typography className={classNames(classes.comparisons, classes.spacingToTheRight)}>{kpiTextConfiguration.comparisonIndicator}</Typography>
        <Typography className={classNames(classes.comparisons, classes.infoText)}>{kpiTextConfiguration.comparisonIndicatorInfo}</Typography>
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
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  kpiTextConfiguration: PropTypes.instanceOf(
    PropTypes.shape({
      title: PropTypes.string,
      indicator: PropTypes.string,
      unit: PropTypes.string,
      comparisonIndicatorInfo: PropTypes.string,
      comparisonIndicator: PropTypes.string,
    })
  ).isRequired
};

HvKpi.defaultProps = {
  className: ""
};

export default HvKpi;
