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
import PropTypes, { oneOfType } from "prop-types";
import HvTypography from "../../../Typography";
import Actions from "../../../Actions";

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
const MessageContainer = ({
  id,
  classes,
  icon,
  actionsOnMessage,
  actionsOnMessageCallback,
  message
}) => (
  <>
    {icon && <div className={classes.iconContainer}>{icon}</div>}
    <HvTypography
      variant="normalText"
      {...(id && { id: `${id}-message-text` })}
      className={classes.message}
    >
      {message}
    </HvTypography>
    {actionsOnMessage && (
      <div
        {...(id && { id: `${id}-message-actions` })}
        className={classes.actionMessageContainer}
      >
        <Actions
          actions={actionsOnMessage}
          actionsCallback={actionsOnMessageCallback}
        />
      </div>
    )}
  </>
);

MessageContainer.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
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
  actionsOnMessage: oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.func,
        disabled: PropTypes.bool
      })
    )
  ]),
  /**
   * The callback function ran when an action is triggered, receiving ´actionsOnMessage´ as param
   */
  actionsOnMessageCallback: PropTypes.func
};

MessageContainer.defaultProps = {
  id: null,
  classes: "",
  icon: null,
  message: "",
  actionsOnMessage: undefined,
  actionsOnMessageCallback: () => {}
};

export default MessageContainer;
