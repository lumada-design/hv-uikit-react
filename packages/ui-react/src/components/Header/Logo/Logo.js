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

const Logo = ({ classes }) => (
  <div className={classes.companylogoContainer}>
    <div className={classes.companyLogoImage} />
    <div className={classes.companyLogoText}>
      <Typography className={classes.companyLogoText1}>MAINTENANCE</Typography>
      <Typography className={classes.companyLogoText2}>INSIGHTS</Typography>
    </div>
  </div>
);

Logo.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default Logo;
