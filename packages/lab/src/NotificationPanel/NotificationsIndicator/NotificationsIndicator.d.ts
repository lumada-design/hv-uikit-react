import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface Labels {
  label: string;
  buttonLabel: string;
}

export type HvNotificationsIndicatorClassKey =
  | "root"
  | "notificationsIndicator"
  | "newNotificationsFocus"
  | "semanticColoring";

export interface HvNotificationsIndicatorProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvNotificationsIndicatorClassKey> {
  /**
   * Title to apply to indicator
   */
  labels: Labels[];
}

export default function HvNotificationsIndicator(
  props: HvNotificationsIndicatorProps
): JSX.Element | null;
