import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvProgressClassKey =
  | "root"
  | "progress"
  | "progressContainer"
  | "progressBarContainer"
  | "progressBar"
  | "progressDone"
  | "progressError"
  | "progressBarLabel"
  | "progressAriaAlert";

export interface HvProgressBarProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvProgressClassKey> {
  /**
   * The value of the progress bar.
   */
  value?: number;
  /**
   * Indicates current status of the progress bar represented by the color.
   */
  status?: boolean;
  /**
   * If `true` the progress bar will not show the percentage label.
   */
  undeterminate?: boolean;
  /**
   * Aria Properties passed on to the progress bar.
   */
  valueProps?: object;
}
