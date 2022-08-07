import { FunctionComponent } from "react";

export type GridSpacing = "xs" | "sm" | "md" | "lg";
export type Breakpoints = {
  cols?: number;
  maxWidth?: number;
  minWidth?: number;
  spacing?: GridSpacing;
};

export interface SimpleGridProps extends FunctionComponent {
  spacing?: GridSpacing;
  cols?: number;
  breakpoints?: Breakpoints;
}

export default function HvSimpleGrid(props: SimpleGridProps): JSX.Element | null;
