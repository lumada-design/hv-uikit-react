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
import MuiDialogActions from "@material-ui/core/DialogActions";

/**
 * Actions of the modal.
 *
 * @param classes
 * @param children
 * @param others
 * @returns {*}
 * @constructor
 */
const ModalActions = ({ classes, children, ...others }) => (
  <MuiDialogActions
    classes={{
      root: classes.root,
      action: classes.action
    }}
    {...others}
  >
    {children}
  </MuiDialogActions>
);

ModalActions.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component (container for the actions).
     */
    root: PropTypes.string,
    /**
     * Style applied to each child action.
     */
    action: PropTypes.string
  }).isRequired,
  /**
   * Actions of the modal.
   */
  children: PropTypes.node.isRequired
};

export default ModalActions;
