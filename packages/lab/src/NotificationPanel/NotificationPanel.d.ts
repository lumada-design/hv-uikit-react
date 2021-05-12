import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvDropDownMenuProps } from "@hv/uikit-react-core";

export interface Actions {
  values: string;
  dropDownMenuProps: HvDropDownMenuProps;
}

export interface Labels {
  notificationGroupHeader: {
    newNotifications: string;
    olderNotifications: string;
  };
  notificationIndicator: {
    label: string;
    buttonLabel: string;
  };
}

interface Header {
  /**
   * The title of the header
   */
  headerTitle: string;
  /**
   * The icon that denoted close functionality
   */
  headerCloseImg: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

interface values {
  label: string;
  action: string;
  callback?: (event: Event) => void;
}

interface actions {
  values: values;
  dropDownMenuProps?: HvDropDownMenuProps;
}

interface notification {
  id: string;
  title: string;
  isRead?: boolean;
  date: string | number | Record<string, unknown>;
  icon?: React.ReactNode;
  onClick?: (event: Event) => void;
  onKeyPress?: (event: Event) => void;
  actions?: actions;
}

export type HvNotificationPanelClassKey =
  | "root"
  | "closed"
  | "open"
  | "panel"
  | "actionBar"
  | "actionBarRoot"
  | "notificationsIndicator";

export interface HvNotificationPanelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvNotificationPanelClassKey> {
  /**
   * 'true' if panel is open or 'false' if the panel is not open
   *
   * @deprecated This logic should be external, i.e. using the HvAppSwitcherPanel inside a Drawer component.
   */
  open?: boolean;

  /**
   * Array of notification object to be rendered inside the panel
   */
  notifications: notification[];
  /**
   * Indicates that new notifications have arrived
   */
  hasNewNotifications?: boolean;

  /**
   * renderable footer element
   */
  footer?: React.ReactNode;

  /**
   * Title of the EmptyStatePanel
   */
  emptyStatePanelTitle?: string;

  /**
   * Message of the EmptyStatePanel
   */
  emptyStatePanelMessage?: string;

  /**
   * Empty Panel custom Icon
   */
  emptyStatePanelIcon?: React.ReactNode;

  /**
   * Labels to apply to the Panel
   */
  labels?: Labels[];

  /**
   * Function to be supplied to the notification update button
   */
  newNotificationsButtonAction?: (event: Event) => void;
}

export default function HvNotificationPanel(props: HvNotificationPanelProps): JSX.Element | null;
