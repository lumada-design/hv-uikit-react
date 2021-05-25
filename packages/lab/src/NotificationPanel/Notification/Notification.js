import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment/moment";
import { HvTypography } from "@hv/uikit-react-core";

import { withStyles } from "@material-ui/core";
import styles from "./styles";

const Notification = ({
  classes,
  className,
  title,
  isRead,
  icon,
  date,
  onClick,
  onKeyPress,
  rightContainer,
  isHighlighted,
}) => {
  const getTime = () => {
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

  return (
    <div
      onClick={onClick}
      onKeyPress={onKeyPress}
      className={clsx(className, classes.root, {
        [classes.notificationWrapperDropdown]: isHighlighted,
        [classes.read]: isRead,
      })}
      role="button"
      tabIndex={0}
    >
      <div
        className={clsx(classes.notificationWrapper, {
          [classes.notificationDropdownOpen]: isHighlighted,
        })}
      >
        <div className={classes.iconContainer}>{icon}</div>
        <div>
          <div className={classes.messageContainer}>
            <HvTypography variant={isRead ? "normalText" : "highlightText"}>{title}</HvTypography>
          </div>

          <div className={classes.timeContainer}>
            <div
              className={clsx(classes.bullet, {
                [classes.hide]: isRead,
              })}
            />
            <div className={classes.time}>{getTime()}</div>
          </div>
        </div>
      </div>
      <div className={classes.notificationActionWrapper}>{rightContainer}</div>
    </div>
  );
};

Notification.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root of the accordion.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the notification wrapper.
     */
    notificationWrapper: PropTypes.string,

    /**
     * Styles applied to the notification wrapper when the actions dropdown is open.
     */
    notificationWrapperDropdown: PropTypes.string,

    /**
     * Styles applied to the notification icon container.
     */
    iconContainer: PropTypes.string,

    /**
     * Styles applied to the notification message container.
     */
    messageContainer: PropTypes.string,

    /**
     * Styles applied to the notification time container.
     */
    timeContainer: PropTypes.string,

    /**
     * Styles applied to the notification bullet.
     */
    bullet: PropTypes.string,

    /**
     * Styles applied to the content when it is hidden.
     */
    hide: PropTypes.string,

    /**
     * Styles applied to the notification time indicator.
     */
    time: PropTypes.string,
    /**
     * Styles applied to the notification is read.
     */
    read: PropTypes.string,
    /**
     * Styles applied when the notification dorpdown is open.
     */
    notificationDropdownOpen: PropTypes.string,

    /**
     * Styles applied to the notification message actions dropdown.
     */
    notificationActionWrapper: PropTypes.string,
  }).isRequired,

  /**
   * Class names to be applied to the accordion.
   */
  className: PropTypes.string,
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
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  /**
   * renderable icon that denotes the status of the notification
   */
  icon: PropTypes.element,
  /**
   *Click action applied to the notification
   */
  onClick: PropTypes.func,
  /**
   * On Key Press action applied to the notification
   */
  onKeyPress: PropTypes.func,
  /**
   * Actions to be executed by the notification, available in the dropdown menu
   */
  rightContainer: PropTypes.node,
  /**
   * Denotes index of clicked notification
   */
  isHighlighted: PropTypes.string,
};

export default withStyles(styles, { name: "HvNotificationPanelNotification" })(Notification);
