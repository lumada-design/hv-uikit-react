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
import Button from "@material-ui/core/Button";

const HvButton = props => {
  const { classes, children, disabled } = props;

  return (
    <Button className={classes.root} disabled={disabled} disableRipple>
      {children}
    </Button>
  );
};

HvButton.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

HvButton.defaultProps = {
  disabled: false
};

export default HvButton;
