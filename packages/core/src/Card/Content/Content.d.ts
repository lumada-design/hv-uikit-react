import React from "react";
import { CardContentProps, StandardProps } from "@material-ui/core";

export interface HvCardContentProps extends StandardProps<CardContentProps, HvCardContentClassKey> {
  /**
   *  The renderable content inside the body of the card.
   */
  innerCardContent?: React.ReactNode;
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClickAction?: (event: MouseEvent) => void;
}

export type HvCardContentClassKey = "content" | "borderBottom" | "item";

export default function HvCardContent(props: HvCardContentProps): JSX.Element | null;
