import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvBadgeClassKey =
  | "root"
  | "badgeContainer"
  | "badge"
  | "badgeIcon"
  | "showCount"
  | "showLabel"
  | "badgeOneDigit";

export interface HvBadgeProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvBadgeClassKey> {
  /**
   * Count is the number of unread notifications.
   * Note count and label are mutually exclusive.
   * count is ignored when label is specified at the same time.
   */
  count?: number;
  /**
   * True if count should be displayed.
   * Note showCount and label are mutually exclusive.
   * showCount is ignored when label is specified at the same time.
   */
  showCount?: boolean;
  /**
   * The maximum number of unread notifications to be displayed
   */
  maxCount?: number;
  /**
   * Custom text to show in place of count.
   * Note showCount and label are mutually exclusive.
   * showCount is ignored when label is specified at the same time.
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

export default function HvBadge(props: HvBadgeProps): JSX.Element | null;
