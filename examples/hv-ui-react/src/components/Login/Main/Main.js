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
import Form from "../Form";

const Container = ({ classes, login }) => (
  <div className={classes.root}>
    <div className={classes.container}>
      <div className={classes.logo}>
        <Typography className={classes.logo1}>MAINTENANCE</Typography>
        <Typography className={classes.logo2}>INSIGHTS</Typography>
      </div>
      <div className={classes.form}>
        <Form login={login} />
      </div>
      <div className={classes.footer}>
        <div className={classes.footerLogo} />
        <Typography className={classes.footerText}>
          ©2018 Hitachi Vantara. All Rights Reserved.
        </Typography>
      </div>
    </div>
  </div>
);

Container.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  login: PropTypes.instanceOf(Function).isRequired
};

export default Container;
