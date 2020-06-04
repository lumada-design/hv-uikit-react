import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvLoadingProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvLoadingClassKey> {
  /**
   * Indicates if the component should be render in a small size.
   */
  small?: boolean;
  /**
   * The text to be displayed.
   */
  text?: string;
  /**
   * Activates the loading visualization.
   */
  isActive?: boolean;
  /**
   * Color applied to the bars.
   */
  color?: string;
  /**
   * Children
   */
  children?: React.ReactNode;
}

export type HvLoadingClassKey =
  | "root"
  | "barContainer"
  | "loadingBar"
  | "loadingText"
  | "overlay"
  | "blur";

export default function HvLoading(props: HvLoadingProps): JSX.Element | null;
