import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvFooterProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvFooterClassKey> {
  labelLeftName?: string;
  labelRightName?: string;
}

export type HvFooterClassKey = "root" | "labelLeft" | "labelRight";

export default function HvFooter(props: HvFooterProps): JSX.Element | null;
