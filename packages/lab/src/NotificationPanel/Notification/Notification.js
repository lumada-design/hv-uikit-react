import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HvTypography, withTooltip } from "@hitachivantara/uikit-react-core";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

dayjs.extend(relativeTime);

const hideTooltip = (evt) => evt.target.scrollHeight <= evt.target.clientHeight;

const wrapperTooltip = (Component, label) => {
  const ComponentFunction = () => Component;
  // override thr withTooltip styles as we want to use the styles of the component
  return withTooltip(ComponentFunction, label, "top", hideTooltip, { style: {} });
};

const Notification = ({
  classes,
  className,
  notificationId,
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
      return dayjs(date).fromNow();
    }

    const d = dayjs(date);
    let format = "D MMMM YYYY, h:mm A";

    if (d.isSame(Date.now(), "week")) {
      format = "ddd, h:mm A";
    }

    return d.format(format);
  };

  const NotificationWithTooltip = wrapperTooltip(
    <div className={classes.messageContainer}>
      <HvTypography variant={isRead ? "normalText" : "highlightText"}>{title}</HvTypography>
    </div>,
    title
  );

  return (
    <div
      onClick={(event) => onClick?.(event, notificationId)}
      onKeyPress={(event) => onKeyPress?.(event, notificationId)}
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
          [classes.clickable]: !!onClick,
        })}
      >
        <div className={classes.iconContainer}>{icon}</div>
        <div>
          <NotificationWithTooltip />
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
     * Styles applied when the notification dropdown is open.
     */
    notificationDropdownOpen: PropTypes.string,

    /**
     * Styles applied to the notification message actions dropdown.
     */
    notificationActionWrapper: PropTypes.string,
    /**
     * Styles applied to the notification when clickable
     */
    clickable: PropTypes.string,
  }).isRequired,

  /**
   * Class names to be applied to the accordion.
   */
  className: PropTypes.string,
  /**
   * Notification id
   */
  notificationId: PropTypes.string,
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
   * Click action applied to the notification
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
  isHighlighted: PropTypes.bool,
};

export default withStyles(styles, { name: "HvNotificationPanelNotification" })(Notification);
