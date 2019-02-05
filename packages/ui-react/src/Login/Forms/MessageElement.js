import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";


/**
 * Message composes by an icon and a text message.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function MessageElement(props) {
  const {iconElement, showMessage, icon, message} = props;
  const Icon = iconElement;
  return (
      <div className={showMessage}>
        <Icon className={icon}/>
        <Typography variant="body1">{message}</Typography>
      </div>
  );
};

MessageElement.prototype = {
  /**
   * Icon component.
   */
  iconElement: PropTypes.node.isRequired,
  /**
   * Class for the div.
   */
  showMessage: PropTypes.instanceOf(Object).isRequired,
  /**
   * Class for the icon.
   */
  icon: PropTypes.instanceOf(Object).isRequired,
  /**
   * Message to be showed.
   */
  message: PropTypes.string.isRequired
}

export default MessageElement;