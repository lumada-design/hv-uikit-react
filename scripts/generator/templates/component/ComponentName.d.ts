import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvComponentNameClassKey = "root";

export type HvComponentNameProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvComponentNameClassKey
>;

export default function HvComponentName(props: HvComponentNameProps): JSX.Element | null;
