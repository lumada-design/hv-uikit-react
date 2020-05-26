import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvComponentNameProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvComponentNameClassKey> {}

export type HvComponentNameClassKey = "root";

export default function HvComponentName(props: HvComponentNameProps): JSX.Element | null;
