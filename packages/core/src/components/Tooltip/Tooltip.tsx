import {
  Fade,
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";
import { forwardRef, ReactElement } from "react";
import { TransitionProps as MuiTransitionProps } from "@mui/material/transitions";
import { clsx } from "clsx";
import { useTheme } from "@core/hooks";
import { popperSx } from "./Tooltip.styles";
import tooltipClasses, { HvTooltipClasses } from "./tooltipClasses";

export type HvTooltipPlacementType =
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";

export interface HvTooltipProps
  extends Omit<MuiTooltipProps, "classes" | "title"> {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvTooltipClasses;
  /**
   * If true, the tooltip is shown.
   */
  open?: boolean;
  /**
   * Tooltip placement.
   */
  placement?: HvTooltipPlacementType;
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This property won't impact the enter touch delay (enterTouchDelay).
   */
  enterDelay?: number;
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title?: string | ReactElement;
  /**
   * The component used for the transition
   */
  TransitionComponent?: React.JSXElementConstructor<
    MuiTransitionProps & { children: React.ReactElement<any, any> }
  >;
  /**
   * Properties applied to the Transition element.
   */
  TransitionProps?: MuiTransitionProps;
  /**
   * Defines if should use a single or multiline tooltip.
   */
  useSingle?: boolean;
  /**
   * Node to apply the tooltip.
   */
  children: ReactElement;
}

/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 */

export const HvTooltip = forwardRef((props: HvTooltipProps, ref) => {
  const {
    className,
    classes,
    open,
    enterDelay = 300,
    placement = "top",
    useSingle = true,
    children,
    title,
    TransitionComponent = Fade,
    TransitionProps = { timeout: 400, placement },
    ...others
  } = props;

  const { rootId } = useTheme();

  return (
    <MuiTooltip
      ref={ref}
      open={open ?? undefined}
      enterDelay={enterDelay}
      placement={placement}
      TransitionComponent={TransitionComponent}
      TransitionProps={TransitionProps}
      className={className}
      classes={{
        tooltip: useSingle
          ? clsx(tooltipClasses.tooltip, classes?.tooltip)
          : clsx(tooltipClasses.tooltipMulti, classes?.tooltipMulti),
        popper: clsx(tooltipClasses.popper, classes?.popper),
      }}
      title={title}
      PopperProps={{
        sx: popperSx(useSingle),
        container: document.getElementById(rootId || "") || document.body,
      }}
      {...others}
    >
      {children}
    </MuiTooltip>
  );
});
