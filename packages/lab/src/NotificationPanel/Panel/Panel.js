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

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from "lodash"
import HvBadge from '@hv/uikit-react-core/dist/Badge'

const EnterKeyCode = 13

export default class Panel extends Component {
  onKeyDownClose = (e) => {
    if (e.keyCode === EnterKeyCode) {
      const {onClose} = this.props
      onClose()
    }
  }

  render() {
    const {classes, open, header: {headerTitle, headerCloseImg}, notifications, onClose, footer, children} = this.props
    const newNotificationCount = _.filter(notifications, (notification) => !notification.isRead).length

    return (
      <div className={`${classes.root} ${open ? classes.open : ""} ${classes.panel}`} ref={this.rootRef}>
        <div className={classes.header}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>{headerTitle}</div>
            <HvBadge count={newNotificationCount} showCount />
          </div>
          <div role="button" className={classes.close} tabIndex="0" onKeyDown={this.onKeyDownClose} onClick={onClose}>
            {headerCloseImg}
          </div>
        </div>
        <div className={classes.notificationsContainer}>
          {children}
        </div>
        <div className={classes.footerContainer}>
          {footer}
        </div>
      </div>
    )
  }
}

Panel.propTypes = {
  /**
   * 'true' if the panel is open or 'false if the panel is closed
   */
  open: PropTypes.bool,
  /**
   * Number of new notifications
   */
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * 'true' if notification has been read; 'false' otherwise
       */
      isRead: PropTypes.bool.isRequired
    }).isRequired
  ),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * styles applied to the panel
     */
    panel: PropTypes.string
  }).isRequired,
  /**
   * The function that will be executed when the panel is closed
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Object that holds header properties
   */
  header: PropTypes.shape({
    /**
     * The title of the header
     */
    headerTitle: PropTypes.string.isRequired,
    /**
     * The icon that denoted close functionality
     */
    headerCloseImg: PropTypes.element.isRequired
  }).isRequired,
  /**
   * The renderable footer element
   */
  footer: PropTypes.element.isRequired,
  /**
   * Node to be rendered
   */
  children: PropTypes.node,
}

Panel.defaultProps = {
  open: false,
  notifications: [],
  children: null
}
