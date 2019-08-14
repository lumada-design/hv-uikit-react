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
import Panel from "./Panel"
import Notification from "./Notification"

export default class NotificationPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: props.open
    }
  }

  handleIconClick = () => {
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  handleIconKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.setState((prevState) => ({
        open: !prevState.open
      }))
    }
  }

  onClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const {classes, icon, header, footer, notifications} = this.props
    const {open} = this.state

    const n = _.map(notifications, (notification) => (
      <Notification key={notification.id} notification={notification} />
    ))

    const panelProps = {
      open,
      classes: {
        panel: classes.panel
      },
      onClose: this.onClose,
      header,
      footer,
      notifications
    }

    return (
      <div className={classes.root}>
        <div role="button" className={classes.iconWrapper} tabIndex="0" onKeyDown={this.handleIconKeyDown} onClick={this.handleIconClick}>
          <HvBadge icon={icon} showCount count={notifications.length} classes={{badgeBorder: classes.badgeBorder}} />
        </div>
        <Panel {...panelProps}>
          {n}
        </Panel>
      </div>
    )
  }
}

NotificationPanel.propTypes = {
  /**
   * 'true' if panel is open or 'false' if the panel is not open
   */
  open: PropTypes.bool,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * styles object applied to the panel
     */
    panel: PropTypes.any,
    /**
     * styles object applied to badgeContainer
     */
    badgeBorder: PropTypes.any
  }).isRequired,
  /**
   * renderable element that opens the notification panel
   */
  icon: PropTypes.element.isRequired,
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
   * Array of notification object to be rendered inside the panel
   */
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Id of notification
       */
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  /**
   * renderable footer element
   */
  footer: PropTypes.element.isRequired
}

NotificationPanel.defaultProps = {
  open: false
}
