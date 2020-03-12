import * as React from "react";
import { StandardProps } from "@material-ui/core";
import PropTypes from "prop-types/index";

export interface HvBadgeProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvBadgeClassKey> {
  /**
   *   A Jss Object used to override or extend the styles applied to the badge.
   */
  classes?: {
    /**
     * Styles applied to the component root class.
     */
    root?: string;
    /**
     * Styles applied to the component badge position.
     */
    badgePosition?: string;
    /**
     * Styles applied to the component badge.
     */
    badge?: string;
    /**
     * Styles applied to the component badge icon.
     */
    badgeIcon?: string;
    /**
     * Styles applied to the component when shows count.
     */
    showCount?: string;
    /**
     * Styles applied to the component when count has one digit.
     */
    badgeOneDigit?: string;
    /**
     * Styles applied to the component badge container.
     */
    badgeContainer?: string
  };
  /**
   * Count is the number of unread notifications
   */
  count: number;
  /**
   * True if count should be displayed.
   */
  showCount?: boolean;
  /**
   * The maximum number of unread notifications to be displayed
   */
  maxCount?: number;
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
  | "badgeOneDigit";

export default function HvBadge(props: HvBadgeProps): JSX.Element | null;
