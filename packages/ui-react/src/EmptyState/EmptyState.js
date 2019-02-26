/**
 * Copyright (c) 2019 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const HvEmptyState = props => {
  const { title, message, icon, classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.iconContainer}>
          {icon}
        </div>
        <div className={classes.textContainer}>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.message}>{message}</Typography>
        </div>
      </div>
    </div>
  );
};

HvEmptyState.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the empty state component.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The title to be shown.
   */
  title: PropTypes.string.isRequired,
  /**
   * The message to be shown.
   */
  message: PropTypes.string.isRequired,
  /**
   *  Icon to be presented.
   */
  icon: PropTypes.element.isRequired
};

export default HvEmptyState;
