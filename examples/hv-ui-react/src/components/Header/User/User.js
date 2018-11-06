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
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styles from "./styles";

const User = ({ classes, data, logout }) => (
  <div className={classes.user}>
    <div className={classes.userInfo}>
      <Typography className={classes.userName}>
        {data.name}
      </Typography>
      <Typography className={classes.userRole}>
        {data.role}
      </Typography>
    </div>
    <IconButton className={classes.userButton} onClick={() => logout()}>
      <AccountCircle className={classes.userIcon} />
    </IconButton>
  </div>
  );

User.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.instanceOf(Function).isRequired
};

export default withStyles(styles, { withTheme: true })(User);
