import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvComponentNameClassKey = "root";

export type HvComponentNameProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvComponentNameClassKey
>;

export default function HvComponentName(props: HvComponentNameProps): JSX.Element | null;
