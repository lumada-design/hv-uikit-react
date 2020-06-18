import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvBadgeProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvBadgeClassKey> {
  /**
   * Count is the number of unread notifications
   */
  count?: number;
  /**
   * True if count should be displayed. Exclusive to label.
   */
  showCount?: boolean;
  /**
   * The maximum number of unread notifications to be displayed
   */
  maxCount?: number;
  /**
   * Custom text to show in place of count. Exclusive to showCount.
   */
  label?: string;
  /**
   * Icon which the notification will be attached.
   */
  icon?: React.ReactNode;
  /**
   * Text which the notification will be attached.
   */
  text?: string;
  /**
   * Text variant.
   */
  textVariant?: string;
}

export type HvBadgeClassKey =
  | "root"
  | "badgeContainer"
  | "badge"
  | "badgeIcon"
  | "showCount"
  | "showLabel"
  | "badgeOneDigit";

export default function HvBadge(props: HvBadgeProps): JSX.Element | null;
