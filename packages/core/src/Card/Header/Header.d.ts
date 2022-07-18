import React from "react";
import { CardHeaderProps, StandardProps } from "@mui/material";

export type HvCardHeaderClassKey =
  | "root"
  | "title"
  | "titleShort"
  | "subheader"
  | "action"
  | "content";

export interface HvCardHeaderProps extends StandardProps<CardHeaderProps, HvCardHeaderClassKey, 'title'> {
  /**
   *  The renderable content inside the icon slot of the header.
   */
  icon?: React.ReactNode;

  /**
   * The renderable content inside the title slot of the header.
   * (explicitly redeclared here to workaround the type inference issue)
   */
  title?: React.ReactNode;
}

export default function HvCardHeader(props: HvCardHeaderProps): JSX.Element | null;
