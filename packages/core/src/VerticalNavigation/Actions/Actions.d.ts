import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvActionsClassKey = "root";

export type HvActionsProps = StandardProps<React.HTMLAttributes<HTMLDivElement>, HvActionsClassKey>;

export default function HvVerticalNavigationActions(props: HvActionsProps): JSX.Element | null;
