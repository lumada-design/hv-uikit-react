import React from "react";
import { CardHeaderProps, StandardProps } from "@material-ui/core";

export type HvCardHeaderClassKey =
  | "root"
  | "title"
  | "titleShort"
  | "subheader"
  | "action"
  | "content";

export interface HvCardHeaderProps extends StandardProps<CardHeaderProps, HvCardHeaderClassKey> {
  /**
   *  The renderable content inside the icon slot of the header.
   */
  icon?: React.ReactNode;
}

export default function HvCardHeader(props: HvCardHeaderProps): JSX.Element | null;
