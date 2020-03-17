import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvHeaderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvHeaderClassKey> {
  /**
   * Position of the component.
   */
  position?: "static" | "relative" | "fixed" | "absolute" | "sticky";
}

export type HvHeaderClassKey = "root" | "header";

export default function HvHeader(props: HvHeaderProps): JSX.Element | null;
