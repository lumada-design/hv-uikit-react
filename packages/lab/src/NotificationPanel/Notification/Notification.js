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

import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment/moment";

export default class Notification extends Component {
  // TODO: figure out rules for how time should be presented
  getTime = () => {
    const {
      notification: { date, isRead }
    } = this.props;

    if (!isRead) {
      return moment(date).fromNow();
    }

    const d = moment(date);
    let format = "D MMMM YYYY, h:mm A";

    if (d.isSame(Date.now(), "week")) {
      format = "ddd, h:mm A";
    }

    return d.format(format);
  };

  render() {
    const {
      classes,
      notification: { title, isRead, icon }
    } = this.props;

    return (
      <div className={clsx(classes.root, { [classes.read]: isRead })}>
        <div className={classes.iconContainer}>{icon}</div>
        <div>
          <div className={clsx(classes.title, { [classes.read]: isRead })}>
            {title}
          </div>
          <div
            className={clsx(classes.timeContainer, { [classes.read]: isRead })}
          >
            <div className={clsx(classes.bullet, { [classes.hide]: isRead })} />
            <div className={classes.time}>{this.getTime()}</div>
          </div>
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Notification object to be rendered
   */
  notification: PropTypes.shape({
    /**
     * Title of the notification
     */
    title: PropTypes.string.isRequired,
    /**
     * 'true' if the notification has been read or 'false' if it has not been read
     */
    isRead: PropTypes.bool.isRequired,
    /**
     * date the notification was created
     */
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ]).isRequired,
    /**
     * renderable icon that denotes the status of the notification
     */
    icon: PropTypes.element
  }).isRequired
};
