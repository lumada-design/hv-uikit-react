import React from "react";
import { CardHeaderProps, StandardProps } from "@material-ui/core";

export interface HvCardHeaderProps extends StandardProps<CardHeaderProps, HvCardHeaderClassKey> {
  /**
   *  The renderable content inside the title slot of the header.
   */
  headerTitle: React.ReactNode;
  /**
   *  The renderable content inside the subheader slot of the header.
   */
  subheader?: React.ReactNode;
  /**
   *  The renderable content inside the icon slot of the header.
   */
  icon?: React.ReactNode;
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClickAction?: (event: MouseEvent) => void;
}

export type HvCardHeaderClassKey =
  | "root"
  | "title"
  | "titleShort"
  | "subheader"
  | "action"
  | "content";

export default function HvCardHeader(props: HvCardHeaderProps): JSX.Element | null;
