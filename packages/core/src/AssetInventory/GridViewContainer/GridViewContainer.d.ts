import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvGridViewContainerProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ClassKey> {
    elements: (reference: React.RefObject<HTMLInputElement>) => void | React.ReactNode;
}

export type ClassKey =
  | "root"
  | "elements"

export default function HvGridViewContainer(props: HvGridViewContainerProps): JSX.Element | null;
