import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvEmptyStateClassKey =
  | "root"
  | "container"
  | "containerMessageOnly"
  | "iconContainer"
  | "textContainer"
  | "titleContainer"
  | "messageContainer"
  | "actionContainer";

export interface HvEmptyStateProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvEmptyStateClassKey, "title"> {
  /**
   * The title to be shown.
   */
  title?: string | React.ReactNode;
  /**
   * The message to be shown.
   */
  message: string | React.ReactNode;
  /**
   * The action message to be shown.
   */
  action?: string | React.ReactNode;
  /**
   *  Icon to be presented.
   */
  icon: React.ReactNode;
}

export default function HvEmptyState(props: HvEmptyStateProps): JSX.Element | null;
