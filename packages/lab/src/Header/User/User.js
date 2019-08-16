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
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import ImageContainer from "../ImageContainer";

/**
 * User container. The render include a text area and a passed image/icon.
 *
 * @param classes
 * @param userData
 * @param userIcon
 * @param onClick
 * @param labels
 * @param verticalStyles
 * @returns {*}
 * @constructor
 */
const User = ({ classes, userData, userIcon, onClick, labels, verticalStyles }) => {
  if (!userData && !userIcon) return (<div>{labels.tenantName}</div>);
  return (
    <div
      className={classNames(classes.userContainer, {
        [classes.userContainerPointer]: onClick,
        [classes.vUserContainer]: verticalStyles
      })}
      onClick={onClick}
      role="presentation"
    >
      {!verticalStyles && (
        <div className={classes.userInfo}>
          {userData && userData.name && (
            <HvTypography variant="labelText">{userData.name}</HvTypography>
          )}
          {userData && userData.role && (
            <HvTypography variant="vizText">{userData.role}</HvTypography>
          )}
        </div>
      )}
      <Grid
        container
        className={classNames(classes.iconContainer, {
          [classes.vIconContainer]: verticalStyles,
          [classes.iconContainerHover]: onClick
        })}
      >
        {userIcon && (
          <ImageContainer
            image={userIcon}
          />
        )}
        {verticalStyles && (
          <HvTypography variant="normalText">Profile</HvTypography>
        )}
      </Grid>
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
  onClick: PropTypes.func,
  /**
   * Object containing the labels to be present
   */
  labels: PropTypes.shape({
    productName: PropTypes.string,
    tenantName: PropTypes.string
  }),
  /**
   * 
   */
  verticalStyles: PropTypes.bool
};

User.defaultProps = {
  userData: null,
  userIcon: null,
  onClick: null,
  labels: {},
  verticalStyles: false
};

export default User;
