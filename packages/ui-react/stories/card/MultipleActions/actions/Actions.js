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
import { HvButton } from "../../../../src";

const Actions = ({ classes }) => (
  <>
    <HvButton className={classes.smallButton} colorType="link">
      View
    </HvButton>
    <HvButton className={classes.button} colorType="link">
      Share
    </HvButton>
  </>
);

Actions.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired
};

Actions.defaultProps = {};

export default Actions;
