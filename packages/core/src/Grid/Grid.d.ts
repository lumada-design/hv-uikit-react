import { GridProps, StandardProps } from "@material-ui/core";

export type Spacing = "xs" | "sm" | "md" | "lg" | "xl" | "auto";
export type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface HvGridProps extends StandardProps<GridProps, "", "spacing"> {
  /**
   * Defines the space between the type item component. It can only be used on a type container component.
   * Based in the 7.5px factor defined in the theme| it allows the definition of this factor based on the factor
   * (number between 0 and 10)| breakpoint or auto.
   */
  spacing?: Spacing & Columns;
}

export default function HvGrid(props: HvGridProps): JSX.Element | null;
