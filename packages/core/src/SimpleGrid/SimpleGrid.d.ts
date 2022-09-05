export type Spacing = "xs" | "sm" | "md" | "lg";
export type Breakpoint = {
  cols?: number;
  maxWidth?: number;
  minWidth?: number;
  spacing?: Spacing;
};

export interface SimpleGridProps {
  children?: JSX.Element | JSX.Element[];
  spacing?: Spacing;
  cols?: number;
  breakpoints?: Breakpoint[];
}

export default function HvSimpleGrid(props: SimpleGridProps): JSX.Element | null;
