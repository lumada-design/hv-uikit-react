import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvActionContainerClassKey = "root";

export type HvActionContainerProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvActionContainerClassKey
>;

export default function HvActionContainer(props: HvActionContainerProps): JSX.Element | null;
