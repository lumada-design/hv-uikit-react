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
import Typography from "../Typography";

const Badge = props => {
  const { classes, showCount, count, maxCount, icon, text, textVariant } = props;
  const renderedCount = count > maxCount ? `${maxCount}+` : count;
  const Component = icon || text && <Typography variant={textVariant}>{text}</Typography>;

  const badgeClasses = classNames(classes.badgePosition, {
    [classes.badge]: count > 0,
    [classes.showCount]: showCount,
    [classes.badgeIcon]: icon,
    [classes.badgeOneDigit]: showCount && count <= 9
  });

  return (
    <div className={classes.root}>
      {Component}
      <div className={Component ? classes.badgeContainer : null}>
        <div className={badgeClasses}>{showCount && renderedCount}</div>
      </div>
    </div>
  );
};

Badge.propTypes = {
  /**
   *   A Jss Object used to override or extend the styles applied to the badge.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component badge position.
     */
    badgePosition: PropTypes.string,
    /**
     * Styles applied to the component badge.
     */
    badge: PropTypes.string,
    /**
     * Styles applied to the component badge count.
     */
    count: PropTypes.string,
    /**
     * Styles applied to the component badge when count greater than 9.
     */
    badgeTwoDigits: PropTypes.string
  }).isRequired,
  /**
   * Count is the number of unread notifications
   */
  count: PropTypes.number.isRequired,
  /**
   * True if count should be displayed.
   */
  showCount: PropTypes.bool,
  /**
   * The maximum number of unread notifications to be displayed
   */
  maxCount: PropTypes.number,
  /**
   * Icon which the notification will be attached.
   */
  icon: PropTypes.node,
  /**
   * Text which the notification will be attached.
   */
  text: PropTypes.string,
  /**
   * Text variant.
   */
  textVariant: PropTypes.string
};

Badge.defaultProps = {
  showCount: false,
  maxCount: 99,
  icon: null,
  text: null,
  textVariant: null
};

export default Badge;
