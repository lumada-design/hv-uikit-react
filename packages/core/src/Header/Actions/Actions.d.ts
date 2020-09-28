import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvHeaderActionsClassKey = "root";

export type HvHeaderActionsProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvHeaderActionsClassKey
>;

export default function HvHeaderActions(props: HvHeaderActionsProps): JSX.Element | null;
