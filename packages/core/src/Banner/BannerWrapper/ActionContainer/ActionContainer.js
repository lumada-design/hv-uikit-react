/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*  TODO: Review accessibility */

import React from "react";
import Close from "@hv/uikit-react-icons/dist/DawnTheme/Close.XS";
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
    <div className={classes.closeAction} role="button" onClick={onClose} tabIndex={0} onKeyDown={onClose}>
      <Close />
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
