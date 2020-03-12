import { GridProps } from "@material-ui/core";

export type GridSpacing = "xs" | "sm" | "md" | "lg" | "xl" | "auto";

export interface HvGridProps extends GridProps {
  /**
   * Defines the space between the type item component. It can only be used on a type container component.
   * Based in the 7.5px factor defined in the theme, it allows the definition of this factor based on the factor
   * (number between 0 and 10), breakpoint or auto.
   */
  gutterSpacing?: GridSpacing | number;
}

export default function HvGrid(props: HvGridProps): JSX.Element | null;
