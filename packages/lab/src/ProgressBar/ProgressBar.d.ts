import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvProgressBarClassKey = "root";

export type HvProgressBarProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvProgressBarClassKey
>;

export default function HvProgressBar(props: HvProgressBarProps): JSX.Element | null;
