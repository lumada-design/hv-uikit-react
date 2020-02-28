import React from "react";
import PropTypes from "prop-types";
import HvTypography from "../../Typography";

/**
 * Message composes by an icon and a text message.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const MessageElement = ({ iconElement, showMessage, icon, message }) => {
  const iconClone =
    iconElement != null
      ? React.cloneElement(iconElement, {
          className: icon
        })
      : null;

  return (
    <div className={showMessage}>
      {iconClone}
      <HvTypography variant="normalText">{message}</HvTypography>
    </div>
  );
};

MessageElement.propTypes = {
  /**
   * Icon component.
   */
  iconElement: PropTypes.node,
  /**
   * Class for the div.
   */
  showMessage: PropTypes.string.isRequired,
  /**
   * Class for the icon.
   */
  icon: PropTypes.string,
  /**
   * Message to be showed.
   */
  message: PropTypes.string.isRequired
};

MessageElement.defaultProps = {
  iconElement: null,
  icon: null
};

export default MessageElement;
