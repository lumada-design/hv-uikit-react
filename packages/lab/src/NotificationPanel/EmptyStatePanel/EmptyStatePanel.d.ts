import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvEmptyStatePanelClassKey =
  | "emptyStateRoot"
  | "emptyStateContainer"
  | "emptyStateIconContainer"
  | "emptyStateTitleContainer";

export interface HvEmptyStatePanelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvEmptyStatePanelClassKey> {
  /**
   * Title to display in the Empty Panel
   */
  title: string;
  /**
   * Empty State message to display
   */
  message: string;

  /**
   * Empty State icon
   */
  icon?: React.ReactNode;
}

export default function HvEmptyStatePanel(props: HvEmptyStatePanelProps): JSX.Element | null;
