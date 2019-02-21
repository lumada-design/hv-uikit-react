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
import HvButton from "../../Button";

const Actions = ({ classes, onCancel, onApply, cancelLabel, applyLabel }) => (
  <div className={classes.root}>
    <HvButton className={classes.button} onClick={onCancel} colorType="link">
      {cancelLabel}
    </HvButton>
    <HvButton className={classes.button} onClick={onApply} colorType="link">
      {applyLabel}
    </HvButton>
  </div>
);

Actions.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * A function to be executed whenever cancel action is triggered.
   */
  onCancel: PropTypes.func,
  /**
   * A function to be executed whenever apply action is triggered.
   */
  onApply: PropTypes.func,
  /**
   * Label for cancel button
   */
  cancelLabel: PropTypes.string,
  /**
   * Label for apply button
   */
  applyLabel: PropTypes.string
};

Actions.defaultProps = {
  onCancel() {},
  onApply() {},
  cancelLabel: "Cancel",
  applyLabel: "Apply"
};

export default Actions;
