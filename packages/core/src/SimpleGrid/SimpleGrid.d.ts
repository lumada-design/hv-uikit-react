import { FunctionComponent } from "react";

export type Spacing = "xs" | "sm" | "md" | "lg";
export type Breakpoints = {
  cols?: number;
  maxWidth?: number;
  minWidth?: number;
  spacing?: Spacing;
};

export interface SimpleGridProps extends FunctionComponent {
  spacing?: Spacing;
  cols?: number;
  breakpoints?: Breakpoints;
}

export default function HvSimpleGrid(props: SimpleGridProps): JSX.Element | null;
