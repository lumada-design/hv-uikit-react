import React from "react";
import PropTypes from "prop-types";
import HvTypography from "../../Typography";

const MessageElement = ({ iconElement, showMessage, icon, message }) => {
  const iconClone =
    iconElement != null
      ? React.cloneElement(iconElement, {
          className: icon,
        })
      : null;

  return (
    <div className={showMessage}>
      {iconClone}
      <HvTypography>{message}</HvTypography>
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
  message: PropTypes.string.isRequired,
};

MessageElement.defaultProps = {
  iconElement: null,
  icon: null,
};

export default MessageElement;
