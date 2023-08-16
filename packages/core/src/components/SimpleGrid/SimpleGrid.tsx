import { HvBaseProps } from "@core/types/generic";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { Breakpoint, Spacing } from "./types";
import { getContainerStyle, useClasses } from "./SimpleGrid.styles";

export interface HvSimpleGridProps extends HvBaseProps {
  /**
   * Spacing with pre-defined values according the values defined in the theme
   */
  spacing?: Spacing;
  /**
   * Provide an array to define responsive behavior:
   *
   *    maxWidth or minWidth: max-width or min-width at which media query will work
   *
   *    cols: number of columns per row at given max-width
   *
   *    spacing: optional spacing at given max-width, if not provided spacing from component prop will be used instead
   */
  breakpoints?: Breakpoint[];
  /**
   * Number of how many columns the content will be displayed
   */
  cols?: number;
}

export const HvSimpleGrid = (props: HvSimpleGridProps) => {
  const {
    children,
    breakpoints,
    spacing = "sm",
    cols,
    className,
    ...others
  } = useDefaultProps("HvSimpleGrid", props);

  const { cx, css } = useClasses();

  const containerStyle = getContainerStyle({ breakpoints, spacing, cols });

  return (
    <div className={cx(css(containerStyle), className)} {...others}>
      {children}
    </div>
  );
};
