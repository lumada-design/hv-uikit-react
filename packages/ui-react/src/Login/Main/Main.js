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

const Container = ({ classes, login, backgroundImage }) => (
  <div
    className={classes.root}
    style={{ backgroundImage: `url(${  backgroundImage  })` }}
  >
    <div className={classes.rightContainer}>
      <Typography className={classes.title}>Welcome</Typography>
      <div className={classes.formContainer}>
        <Form login={login} />
      </div>
    </div>
  </div>
);

Container.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  login: PropTypes.instanceOf(Function).isRequired,
  backgroundImage: PropTypes.string
};

Container.defaultProps = {
  backgroundImage: null
};

export default Container;
