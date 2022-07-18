import React from "react";
import { StandardProps, BoxProps } from "@mui/material";
import { HvSemanticColorKeys, HvAtmosphereColorKeys } from "..";

export type HvCardClassKey =
  | HvSemanticColorKeys
  | "root"
  | "semanticContainer"
  | "icon"
  | "sema0"
  | "semanticBar"
  | "selectable"
  | "selected";

export interface HvCardProps extends StandardProps<BoxProps, HvCardClassKey> {
  /**
   *  The renderable content inside the icon slot of the header.
   */
  icon?: React.ReactNode;
  /**
   *  The border color at the top of the card. Must be one of palette semantic colors. To set another color, the borderTop should be override.
   *  @deprecated use status color instead 
   */
  semantic?: 
  | "sema0" 
  | HvSemanticColorKeys 
  | HvAtmosphereColorKeys;
  /**
   *  The border color at the top of the card. Must be one of palette semantic or atmosphere colors.
   *  To set another color, the borderTop should be override.
   */
   statusColor?: 
   | "sema0" 
   | HvSemanticColorKeys 
   | HvAtmosphereColorKeys;
  /**
   * Whether the card is selectable.
   */
  selectable?: boolean;
  /**
   * Whether the card is currently selected.
   */
  selected?: boolean;
}

export default function HvCard(props: HvCardProps): JSX.Element | null;
