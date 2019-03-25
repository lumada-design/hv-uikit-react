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
import Close16 from "@hv-ui/icons/core/S-icons/Close16";
import PropTypes from "prop-types";

/**
 * Container for the actions. This actions include:
 * - X button for close
 * - The passed actions
 * *
 * @param props
 * @returns {*}
 * @constructor
 */
const ActionContainer = ({ classes, onClose, action }) => (
  <div className={classes.actionContainer}>
    <div className={classes.closeAction} role="button" onClick={onClose}>
      <Close16 />
    </div>
    <div className={classes.actionsInnerContainer}>{action}</div>
  </div>
);
ActionContainer.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object),
  /**
   * onClose function.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Actions to display.
   */
  action: PropTypes.node
};

ActionContainer.defaultProps = {
  classes: "",
  action: undefined
};

export default ActionContainer;
