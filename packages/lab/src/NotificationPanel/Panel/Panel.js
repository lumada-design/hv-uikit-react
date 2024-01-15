import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { HvBadge } from "@hitachivantara/uikit-react-core";

const EnterKeyCode = 13;

export default class Panel extends Component {
  onKeyDownClose = (e) => {
    if (e.keyCode === EnterKeyCode) {
      const { onClose } = this.props;
      onClose();
    }
  };

  render() {
    const {
      classes,
      open,
      header: { headerTitle, headerCloseImg },
      notifications,
      onClose,
      footer,
      children,
    } = this.props;
    const newNotificationCount = _.filter(
      notifications,
      (notification) => !notification.isRead
    ).length;

    return (
      <div
        className={`${classes.root} ${open ? classes.open : ""} ${classes.panel}`}
        ref={this.rootRef}
      >
        <div className={classes.header}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>{headerTitle}</div>
            <HvBadge count={newNotificationCount} showCount />
          </div>
          <div
            role="button"
            className={classes.close}
            tabIndex="0"
            onKeyDown={this.onKeyDownClose}
            onClick={onClose}
          >
            {headerCloseImg}
          </div>
        </div>
        <div className={classes.notificationsContainer}>{children}</div>
        <div className={classes.footerContainer}>{footer}</div>
      </div>
    );
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
      isRead: PropTypes.bool.isRequired,
    }).isRequired
  ),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * styles applied to the panel
     */
    panel: PropTypes.string,
    root: PropTypes.string,
    open: PropTypes.string,
    header: PropTypes.string,
    titleContainer: PropTypes.string,
    title: PropTypes.string,
    close: PropTypes.string,
    notificationsContainer: PropTypes.string,
    footerContainer: PropTypes.string,
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
    headerCloseImg: PropTypes.element.isRequired,
  }).isRequired,
  /**
   * The renderable footer element
   */
  footer: PropTypes.element.isRequired,
  /**
   * Node to be rendered
   */
  children: PropTypes.node,
};

Panel.defaultProps = {
  open: false,
  notifications: [],
  children: null,
};
