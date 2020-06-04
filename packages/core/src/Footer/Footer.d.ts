import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvFooterProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvFooterClassKey> {
  name?: React.ReactNode;
  copyright?: React.ReactNode;
  links?: React.ReactNode;
}

export type HvFooterClassKey =
  | "root"
  | "name"
  | "rightContainer"
  | "copyright"
  | "links"
  | "separator";

export default function HvFooter(props: HvFooterProps): JSX.Element | null;
