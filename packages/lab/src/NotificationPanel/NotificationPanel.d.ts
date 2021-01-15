import * as React from "react";
import { StandardProps } from "@material-ui/core";

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

interface Notification {
  /**
   * Id of notification
   */
  id: string;
}

export type HvNotificationPanelClassKey = "panel" | "badgeBorder";

export interface HvNotificationPanelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvNotificationPanelClassKey> {
  /**
   * 'true' if panel is open or 'false' if the panel is not open
   */
  open?: boolean;

  /**
   * renderable element that opens the notification panel
   */
  icon: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  /**
   * Object that holds header properties
   */
  header: Header;
  /**
   * Array of notification object to be rendered inside the panel
   */
  notifications: Notification[];
  /**
   * renderable footer element
   */
  footer: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function HvNotificationPanel(props: HvNotificationPanelProps): JSX.Element | null;
