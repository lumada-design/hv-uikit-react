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

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import HvTypography from "../../../Typography";

/**
 * Container for the message of the banner. This message may include:
 * - Icon (variant or custom)
 * - Text
 * - Actions
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const MessageContainer = ({ classes, icon, actionsOnMessage, message }) => (
  <span id="client-snackbar" className={classes.messageSpan}>
    {icon}
    <HvTypography
      className={classNames(
        classes.message,
        {
          [classes.messageWithoutIcon]: !icon
        },
        { [classes.messageWithoutAction]: !actionsOnMessage }
      )}
    >
      {message}
    </HvTypography>
    <div className={classes.actionMessageContainer}>{actionsOnMessage}</div>
  </span>
);

MessageContainer.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object),
  /**
   * Icon to be presented.
   */
  icon: PropTypes.node,
  /**
   * The message to display.
   */
  message: PropTypes.node,
  /**
   * Actions to display on message.
   */
  actionsOnMessage: PropTypes.node
};

MessageContainer.defaultProps = {
  classes: "",
  icon: null,
  message: "",
  actionsOnMessage: undefined
};

export default MessageContainer;
