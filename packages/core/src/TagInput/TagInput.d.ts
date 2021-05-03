import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvTagInputClassKey = "root";

export type HvTagInputProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvTagInputClassKey
>;

export default function HvTagInput(props: HvTagInputProps): JSX.Element | null;
