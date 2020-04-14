import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvHeaderActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvHeaderActionsClassKey> {}

export type HvHeaderActionsClassKey = "root";

export default function HvHeaderActions(props: HvHeaderActionsProps): JSX.Element | null;
