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
import PropTypes from "prop-types";
import HvTypography from "../../Typography";

/**
 * Message composes by an icon and a text message.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function MessageElement({ iconElement, showMessage, icon, message }) {
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
}

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
