import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvProgressBarClassKey =
  | "root"
  | "progress"
  | "progressContainer"
  | "progressBarContainer"
  | "progressBar"
  | "progressDone"
  | "progressError"
  | "progressBarLabel"
  | "progressBarLabelHidden";

export interface HvProgressBarProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvProgressBarClassKey>,
    HvProgressBarProps {
  /**
   * The value of the progress bar.
   */
  value?: number;
  /**
   * The status of the progress bar.
   *
   * inProgress is black, error is red and completed is green.
   *
   * When uncontrolled and unspecified it will default to "inProgress".
   */
  status?: string;
  /**
   * If `true` the progress bar will not show the percentage label.
   */
  undeterminate?: boolean;
  /**
   * Aria Properties passed on to the progress bar.
   */
  labelProps?: object;
}

export default function HvProgressBar(props: HvProgressBarProps): JSX.Element | null;
