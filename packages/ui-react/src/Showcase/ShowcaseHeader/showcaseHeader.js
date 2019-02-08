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
import Typography from "@material-ui/core/Typography";

const HvShowCaseHeader = props => {
  const { classes, description, date, reviewed } = props;

  let information;
  if (reviewed) {
    information = `reviewed: ${date}`;
  } else {
    information = `reviewed: ${description}`;
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.labelLeft}>{information}</Typography>
      <Typography className={classes.labelRight}>
        {`© Hitachi Vantara Corporation ${new Date().getFullYear()}. All Rights Reserved.`}
      </Typography>
    </div>
  );
};

HvShowCaseHeader.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * A description to be applied to the header.
   */
  description: PropTypes.string,
  /**
   * If true the component will be marked as reviewed with no extra descriptions.
   */
  reviewed: PropTypes.bool,
  /**
   * When was the component reviewed.
   */
  date: PropTypes.string
};

HvShowCaseHeader.defaultProps = {
  description: "",
  reviewed: false,
  date: "9999-9-9"
};

export default HvShowCaseHeader;
