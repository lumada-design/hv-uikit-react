import React from "react";
import { HvSpacingKeys } from "../theme";

export type Spacing = HvSpacingKeys;
export type Breakpoint = {
  cols?: number;
  maxWidth?: number;
  minWidth?: number;
  spacing?: Spacing;
};

export interface SimpleGridProps {
  children?: React.ReactNode;
  spacing?: Spacing;
  cols?: number;
  breakpoints?: Breakpoint[];
}

export default function HvSimpleGrid(props: SimpleGridProps): JSX.Element | null;
