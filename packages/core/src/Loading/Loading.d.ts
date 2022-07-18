import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvLoadingClassKey =
  | "root"
  | "barContainer"
  | "loadingBar"
  | "label"
  | "overlay"
  | "blur";

export interface HvLoadingProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvLoadingClassKey> {
  /**
   * Indicates if the component should be render in a small size.
   */
  small?: boolean;
  /**
   * The text to be displayed.
   */
  label?: string;
  /**
   * Whether the loading animation is hidden.
   */
  hidden?: boolean;
  /**
   * Color applied to the bars.
   */
  color?: string;
}

export default function HvLoading(props: HvLoadingProps): JSX.Element | null;
