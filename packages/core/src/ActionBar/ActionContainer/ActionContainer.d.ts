import * as React from "react";
import { StandardProps } from "@material-ui/core";

type HvActionContainerProps = StandardProps<React.HTMLAttributes<HTMLDivElement>, HvActionContainerClassKey>

export type HvActionContainerClassKey = "root";

export default function HvActionContainer(props: HvActionContainerProps): JSX.Element | null;
