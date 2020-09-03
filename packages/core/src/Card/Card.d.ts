import React from "react";
import { StandardProps, BoxProps } from "@material-ui/core";
import { HvSemanticColorKeys } from "..";

export interface HvCardProps extends StandardProps<BoxProps, HvCardClassKey> {
  /**
   *  The renderable content inside the icon slot of the header.
   */
  icon?: React.ReactNode;
  /**
   *  The border color at the top of the card. Must be one of palette semantic colors. To set another color, the borderTop should be override.
   */
  semantic?: "sema0" | HvSemanticColorKeys;
  /**
   * Whether the card is selectable.
   */
  selectable: boolean;
  /**
   * Whether the card is currently selected.
   */
  selected?: boolean;
}

export type HvCardClassKey =
  | HvSemanticColorKeys
  | "root"
  | "semanticContainer"
  | "icon"
  | "sema0"
  | "semanticBar"
  | "selectable"
  | "selected";

export default function HvCard(props: HvCardProps): JSX.Element | null;
