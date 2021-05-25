import { GridProps, StandardProps } from "@material-ui/core";

export type Spacing = "xs" | "sm" | "md" | "lg" | "xl" | "auto";
export type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type HvGridClassKey =
  | "root"
  | "container"
  | "item"
  | "zeroMinWidth"
  | "direction-xs-column"
  | "direction-xs-reverse"
  | "direction-xs-row-reverse"
  | "wrap-xs-nowrap"
  | "wrap-xs-wrap-reverse"
  | "align-items-xs-center"
  | "align-items-xs-flex-start"
  | "align-items-xs-flex-end"
  | "align-items-xs-baseline"
  | "align-content-xs-center"
  | "align-content-xs-flex-start"
  | "align-content-xs-flex-end"
  | "align-content-xs-space-between"
  | "align-content-xs-space-around"
  | "justify-xs-center"
  | "justify-xs-flex-end"
  | "justify-xs-space-between"
  | "justify-xs-space-around"
  | "justify-xs-space-evenly"
  | "spacing-xs-1"
  | "spacing-xs-2"
  | "spacing-xs-3"
  | "spacing-xs-4"
  | "spacing-xs-5"
  | "spacing-xs-6"
  | "spacing-xs-7"
  | "spacing-xs-8"
  | "spacing-xs-9"
  | "spacing-xs-10"
  | "grid-xs-auto"
  | "grid-xs-true"
  | "grid-xs-1"
  | "grid-xs-2"
  | "grid-xs-3"
  | "grid-xs-4"
  | "grid-xs-5"
  | "grid-xs-6"
  | "grid-xs-7"
  | "grid-xs-8"
  | "grid-xs-9"
  | "grid-xs-10"
  | "grid-xs-11"
  | "grid-xs-12";

export interface HvGridProps extends StandardProps<GridProps, HvGridClassKey, "spacing"> {
  /**
   * Defines the space between the type item component. It can only be used on a type container component.
   * Based in the 7.5px factor defined in the theme| it allows the definition of this factor based on the factor
   * (number between 0 and 10)| breakpoint or auto.
   */
  spacing?: Spacing & Columns;
}

export default function HvGrid(props: HvGridProps): JSX.Element | null;
