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
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist/KeyboardUtils";
import partialRight from "lodash/partialRight"
import classNames from "classnames";
import HvTypography from "../../Typography";
import ImageContainer from "../ImageContainer";

/** 
 * Handles the clicking of the user data
 * 
 * @param evt - The event that happened when the user data was interacted.
 * @param onClick - The provided user's function.
 */
const handleClick = (evt, onClick) => {
  if(evt) evt.stopPropagation();
  // we are checking specifically for false because if "iskeypress" returns true or undefined it should continue
  if (isKeypress(evt, KeyboardCodes.Enter) === false) return;
  onClick();
}

/**
 * User container. The render include a text area and a passed image/icon.
 *
 * @param classes
 * @param userData
 * @param userIcon
 * @param onClick
 * @returns {*}
 * @constructor
 */
const User = ({ classes, userData, userIcon, onClick }) => {
  if (!userData && !userIcon) return "";
  return (
    <div
      className={classNames(classes.userContainer, {
        [classes.userContainerPointer]: onClick
      })}
      onClick={partialRight(handleClick , onClick)}
      role="button"
      onKeyDown={partialRight(handleClick , onClick)} 
      tabIndex={0}
    >
      <div className={classes.userInfo}>
        {userData && userData.name && (
          <HvTypography variant="labelText">{userData.name}</HvTypography>
        )}
        {userData && userData.role && (
          <HvTypography variant="vizText">{userData.role}</HvTypography>
        )}
      </div>
      {userIcon && (
        <ImageContainer
          image={userIcon}
          containerClassName={classNames(classes.iconContainer, {
            [classes.iconContainerHover]: onClick
          })}
        />
      )}
    </div>
  );
};

User.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Object containing the text to be present
   */
  userData: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string
  }),
  /**
   * Image to be render. Can be a path for a image or a component.
   */
  userIcon: PropTypes.node,
  /**
   * Function to be triggered by clicking in any point of container.
   */
  onClick: PropTypes.func
};

User.defaultProps = {
  userData: null,
  userIcon: null,
  onClick: null
};

export default User;
