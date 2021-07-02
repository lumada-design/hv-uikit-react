import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { deprecatedPropType, withStyles } from "@material-ui/core";
import {
  HvPanel,
  HvActionBar,
  HvDropDownMenu,
  setId,
  useLabels,
  useLocale,
} from "@hv/uikit-react-core";

import styles from "./styles";

import Notification from "./Notification";
import EmptyStatePanel from "./EmptyStatePanel";
import NotificationsIndicator from "./NotificationsIndicator";

const DEFAULT_LABELS = {
  notificationGroupHeader: {
    newNotifications: "New",
    olderNotifications: "Earlier",
  },
  notificationIndicator: {
    label: "You have new notifications",
    buttonLabel: "Update",
  },
};

/**
 * Notification Panel displays all of read and unread notifications. Still in development
 */

const HvNotificationPanel = ({
  id,
  className,
  classes,
  open,
  footer,
  notifications,
  hasNewNotifications = false,
  emptyStatePanelTitle = "No notifications",
  emptyStatePanelMessage = "You currently have no notifications.",
  emptyStatePanelIcon,
  labels: labelsProp,
  newNotificationsButtonAction,
  locale: localeProp,
  ...others
}) => {
  const localeFromProvider = useLocale();

  const locale = localeProp || localeFromProvider;

  const [highlighted, setHighlighted] = useState(undefined);
  const [isExpanded, setIsExpanded] = useState(false);

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const generateNotificationsActions = (notificationId, onToggleOpen, actions) => {
    const expand = notificationId === highlighted;
    const dList = [...actions.values];
    return (
      <HvDropDownMenu
        expanded={expand}
        onClick={(e, item) => {
          setHighlighted(undefined);
          item?.callback?.(notificationId);
        }}
        dataList={dList}
        onToggleOpen={(s) => {
          onToggleOpen?.(s);
          if (s) {
            setHighlighted(notificationId);
          } else {
            setHighlighted(undefined);
          }
          setIsExpanded(!isExpanded);
        }}
        {...actions.dropDownMenuProps}
      />
    );
  };

  const notificationElementGenerator = (notificationsToRender) => {
    return notificationsToRender.map((notification) => {
      const notificationIsHighlighted = highlighted === notification.id;
      return (
        <Notification
          key={notification.id}
          notificationId={notification.id}
          title={notification.title}
          isRead={notification.isRead}
          icon={notification.icon}
          date={notification.date}
          onClick={notification.onClick}
          onKeyPress={notification.onKeyPress}
          rightContainer={generateNotificationsActions(
            notification.id,
            notification.onToggleOpen,
            notification.actions
          )}
          isHighlighted={notificationIsHighlighted}
          locale={locale}
        />
      );
    });
  };

  const hasNotifications = notifications.length > 0;

  const renderNotifications = (notificationsToRender) =>
    notificationElementGenerator(notificationsToRender);

  return (
    <HvPanel
      id={id}
      className={clsx(className, classes.root, {
        [classes.closed]: open === false,
        [classes.open]: open,
      })}
      {...others}
    >
      {hasNewNotifications && (
        <NotificationsIndicator
          labels={labels.notificationIndicator}
          onClick={newNotificationsButtonAction}
        />
      )}
      {hasNotifications ? (
        <div className={classes.panel}>
          {notifications.length > 0 && renderNotifications(notifications)}
        </div>
      ) : (
        <EmptyStatePanel
          id={setId(id, "empty-state")}
          title={emptyStatePanelTitle}
          message={emptyStatePanelMessage}
          icon={emptyStatePanelIcon}
          className={classes.emptyState}
        />
      )}
      {footer && (
        <HvActionBar
          id={setId(id, "action-bar")}
          classes={{
            root: classes.actionBarRoot,
          }}
          className={classes.actionBar}
        >
          {footer}
        </HvActionBar>
      )}
    </HvPanel>
  );
};

HvNotificationPanel.propTypes = {
  /**
   * Id to be applied to the root node of the panel.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied to the root element.
   */
  className: PropTypes.string,
  /**
   * 'true' if panel is open or 'false' if the panel is not open
   *
   * @deprecated This logic should be external, i.e. using the HvAppSwitcherPanel inside a Drawer component.
   */
  open: deprecatedPropType(PropTypes.bool),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * styles object applied to the root
     */
    root: PropTypes.string,
    /**
     * styles object applied to the root when closed
     */
    closed: PropTypes.string,
    /**
     * styles object applied to the root when open
     */
    open: PropTypes.string,
    /**
     * styles object applied to the panel
     */
    panel: PropTypes.string,
    /**
     * styles object applied to the action bar
     */
    actionBar: PropTypes.string,
    /**
     * styles object applied to the root of the action bar
     */
    actionBarRoot: PropTypes.string,
    /**
     * styles object applied to the new notification indicator
     */
    notificationsIndicator: PropTypes.string,
    /**
     * styles object applied to the empty state panel
     */
    emptyState: PropTypes.string,
  }).isRequired,
  /**
   * The properties of the notifications to be rendered in the Panel.
   */
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isRead: PropTypes.bool.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
      icon: PropTypes.element,
      onClick: PropTypes.func,
      onKeyPress: PropTypes.func,
      onToggleOpen: PropTypes.func,
      actions: PropTypes.shape({
        label: PropTypes.bool,
        action: PropTypes.string,
        callback: PropTypes.func,
        dropDownMenuProps: PropTypes.instanceOf(Object),
      }),
    })
  ),
  /**
   * Whether to render the new notifications indicator
   */
  hasNewNotifications: PropTypes.bool,
  /**
   * Action buttons to render in footer
   */
  footer: PropTypes.node,
  /**
   * Title of the EmptyStatePanel
   */
  emptyStatePanelTitle: PropTypes.string,
  /**
   * Message of the EmptyStatePanel
   */
  emptyStatePanelMessage: PropTypes.string,
  /**
   * Empty Panel custom Icon
   */
  emptyStatePanelIcon: PropTypes.node,
  /**
   * Labels to apply to the Panel
   */
  labels: PropTypes.shape({
    /**
     * Labels to apply to the groups separating newer and older notifications
     */
    notificationGroupHeader: {
      olderNotifications: PropTypes.string,
      newNotifications: PropTypes.string,
    },
    /**
     * Labels to apply to the element of the New Notifications Indicator
     */
    notificationIndicator: {
      label: PropTypes.string,
      buttonLabel: PropTypes.string,
    },
  }),
  /**
   * Function to be supplied to the notification update button
   */
  newNotificationsButtonAction: PropTypes.func,
  /**
   * The locale to be used on the notification date, if undefined it will use the one from the HvProvider
   */
  locale: PropTypes.string,
};

export default withStyles(styles, { name: "HvNotificationPanel" })(HvNotificationPanel);
