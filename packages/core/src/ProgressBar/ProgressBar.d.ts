import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvProgressBarClassKey =
  | "root"
  | "progress"
  | "progressContainer"
  | "progressBarContainer"
  | "progressBar"
  | "progressDone"
  | "progressError"
  | "progressBarLabel";

export interface HvProgressBarProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvProgressBarClassKey> {
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
   * Aria Properties passed on to the progress bar.
   */
  labelProps?: object;
}

export default function HvProgressBar(props: HvProgressBarProps): JSX.Element | null;
