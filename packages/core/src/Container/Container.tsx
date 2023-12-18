import { forwardRef } from "react";

import { theme } from "@hitachivantara/uikit-styles";

import { useTheme } from "@mui/material/styles";
import MuiContainer, {
  ContainerProps as MuiContainerProps,
} from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { ExtractNames } from "../utils/classes";

import { staticClasses, useClasses } from "./Container.styles";

export { staticClasses as containerClasses };

export type HvContainerClasses = ExtractNames<typeof useClasses>;

export interface HvContainerProps extends Omit<MuiContainerProps, "classes"> {
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

/** The container enables you to center your content horizontally and bound it to a specific breakpoint. */
export const HvContainer = forwardRef<HTMLDivElement, HvContainerProps>(
  (props, ref) => {
    const {
      maxWidth = false,
      classes: classesProp,
      className,
      fixed,
      disableGutters,
      ...others
    } = useDefaultProps("HvContainer", props);

    const { classes, cx, css } = useClasses(classesProp);

    const muiTheme = useTheme();

    const upMd = useMediaQuery(muiTheme.breakpoints.up("md"));

    const gutters = upMd
      ? {
          // Increases specificity
          [`&.${staticClasses.root}`]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
          },
        }
      : {
          // Increases specificity
          [`&.${staticClasses.root}`]: {
            paddingLeft: theme.space.sm,
            paddingRight: theme.space.sm,
          },
        };

    return (
      <MuiContainer
        className={cx({ [css(gutters)]: !disableGutters }, className)}
        classes={{
          root: classes.root,
          disableGutters: classes.disableGutters,
          fixed: classes.fixed,
          maxWidthXs: classes.maxWidthXs,
          maxWidthSm: classes.maxWidthSm,
          maxWidthMd: classes.maxWidthMd,
          maxWidthLg: classes.maxWidthLg,
          maxWidthXl: classes.maxWidthXl,
        }}
        ref={ref}
        maxWidth={maxWidth}
        fixed={fixed}
        disableGutters={disableGutters}
        {...others}
      />
    );
  }
);
