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
import PropTypes from "prop-types";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import ImageContainer from "../ImageContainer";

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
      onClick={onClick}
      role="presentation"
    >
      <div className={classes.userInfo}>
        {userData && userData.name && (
          <Typography variant="subtitle2">{userData.name}</Typography>
        )}
        {userData && userData.role && (
          <Typography className={classes.userRole}>{userData.role}</Typography>
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
   * A Jss Object used to override or extend the styles applied to the button.
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
