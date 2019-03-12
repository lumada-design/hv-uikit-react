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
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

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
const MessageContainer = props => {
  const { classes, icon, actionsOnMessage, message } = props;

  return (
    <span id="client-snackbar" className={classes.messageSpan}>
      {icon}
      <Typography
        className={classNames(
          classes.message,
          {
            [classes.messageWithoutIcon]: !icon
          },
          { [classes.messageWithoutAction]: !actionsOnMessage }
        )}
      >
        {message}
      </Typography>
      <div className={classes.actionMessageContainer}>{actionsOnMessage}</div>
    </span>
  );
};

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
