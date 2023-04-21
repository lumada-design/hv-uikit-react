import { useTheme } from "@mui/material/styles";
import { ContainerProps as MuiContainerProps } from "@mui/material/Container";
import { forwardRef } from "react";
import { HvBaseProps } from "@core/types";
import { StyledRoot } from "./Container.styles";
import containerClasses, { HvContainerClasses } from "./containerClasses";
import { clsx } from "clsx";

export interface HvContainerProps
  extends Omit<MuiContainerProps, "classes">,
    HvBaseProps {
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: React.ElementType;
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  /** If `true`, the left and right padding is removed. */
  disableGutters?: boolean;
  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   */
  fixed?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvContainerClasses;
}

export const HvContainer = forwardRef<HTMLDivElement, HvContainerProps>(
  ({ maxWidth = false, classes, className, fixed, ...others }, ref) => {
    const muiTheme = useTheme();
    return (
      <StyledRoot
        className={className}
        classes={{
          root: clsx(containerClasses.root, classes?.root),
          disableGutters: clsx(
            containerClasses.disableGutters,
            classes?.disableGutters
          ),
          fixed: clsx(containerClasses.fixed, classes?.fixed),
          maxWidthXs: clsx(containerClasses.maxWidthXs, classes?.maxWidthXs),
          maxWidthSm: clsx(containerClasses.maxWidthSm, classes?.maxWidthSm),
          maxWidthMd: clsx(containerClasses.maxWidthMd, classes?.maxWidthMd),
          maxWidthLg: clsx(containerClasses.maxWidthLg, classes?.maxWidthLg),
          maxWidthXl: clsx(containerClasses.maxWidthXl, classes?.maxWidthXl),
        }}
        $breakpoints={muiTheme.breakpoints}
        ref={ref}
        maxWidth={maxWidth}
        fixed={fixed}
        {...others}
      />
    );
  }
);
