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
import CardActions from "@material-ui/core/CardActions";
import Button from "../../Button";

const Footer = ({ classes, event }) => {
  const { id } = event;

  return (
    <CardActions className={classes.root}>
      <Button>View</Button>
      <Button disabled>Dismiss</Button>
      <Button disabled>Assign</Button>
    </CardActions>
  );
};

Footer.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  event: PropTypes.instanceOf(Object).isRequired
};

export default Footer;
