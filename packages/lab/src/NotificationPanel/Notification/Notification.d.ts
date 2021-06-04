import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvNotificationClassKey =
  | "root"
  | "notificationWrapper"
  | "notificationWrapperDropdown"
  | "iconContainer"
  | "messageContainer"
  | "timeContainer"
  | "bullet"
  | "hide"
  | "time"
  | "notificationActionWrapper"
  | "read"
  | "notificationDropdownOpen";

export interface HvNotificationProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvNotificationClassKey> {
  /**
   * Notification id
   */
  notificationId: string;
  /**
   * Title of the notification
   */
  title: string;
  /**
   * 'true' if the notification has been read or 'false' if it has not been read
   */
  isRead: boolean;
  /**
   * date the notification was created
   */
  date: string | number | object;
  /**
   * renderable icon that denotes the status of the notification
   */
  icon?: React.ReactNode;
  /**
   * Actions to be executed by the notification, available in the dropdown menu
   */
  rightContainer?: React.ReactNode;
  /**
   * Denotes index of clicked notification
   */
  isHighlighted: boolean;
}

export default function HvNotification(props: HvNotificationProps): JSX.Element | null;
