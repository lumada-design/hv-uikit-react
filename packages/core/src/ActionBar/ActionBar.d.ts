import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvActionContainerClassKey = "root";

export type HvActionContainerProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvActionContainerClassKey
>;

export default function HvActionContainer(props: HvActionContainerProps): JSX.Element | null;
