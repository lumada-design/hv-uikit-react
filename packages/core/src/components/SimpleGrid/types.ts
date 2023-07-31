export type Spacing = "sm" | "md" | "lg" | "xl";

export interface Breakpoint {
  cols?: number;
  maxWidth?: number;
  minWidth?: number;
  spacing?: Spacing;
}
