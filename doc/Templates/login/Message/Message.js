import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { HvTypography } from "@hitachivantara/uikit-react-core";

const Message = ({ classes, message, status }) => (
  <div className={clsx(classes.root, classes[status])}>
    <HvTypography variant="normalText">{message[status]}</HvTypography>
  </div>
);

Message.propTypes = {
  /**
   * The classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to root element.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * Message to display.
   */
  message: PropTypes.shape({
    /**
     * Success message.
     */
    success: PropTypes.string,
    /**
     * Error message.
     */
    error: PropTypes.string
  }).isRequired,
  /**
   * Message status.
   */
  status: PropTypes.string.isRequired
};

export default Message;
