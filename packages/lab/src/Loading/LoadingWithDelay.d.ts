import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvLoadingProps } from "./Loading";

export interface HvLoadingWithDelayProps extends HvLoadingProps {
  /**
   * The amount of milliseconds that the component should wait before showing the Loading
   */
  delay: number;
}

export default function HvLoadingWithDelay(props: HvLoadingWithDelayProps): JSX.Element | null;
