import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvActionsClassKey> {}

export type HvActionsClassKey = "root";

export default function HvVerticalNavigationActions(props: HvActionsProps): JSX.Element | null;
