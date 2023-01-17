import { Fade, Tooltip as MuiTooltip } from "@mui/material";
import { forwardRef, ReactElement } from "react";
import { TransitionProps as MuiTransitionProps } from "@mui/material/transitions";
import { popperSx } from "./Tooltip.styles";

export type TooltipPlacementType =
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

export type TooltipProps = {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: {
    /**
     * Styles applied to the tooltip root class.
     */
    root?: string;
    /**
     * Styles applied to the tooltip class when it is single
     *  */
    tooltip?: string;
    /**
     * Styles applied to the tooltip class when it is multi
     *  */
    tooltipMulti?: string;
    /**
     * Styles applied to the popper component
     *  */
    popper?: string;
    /**
     * Styles applied to the title.
     */
    title?: string;
    /**
     * Styles applied to the values container.
     */
    valuesContainer?: string;
    /**
     * Styles applied to the values.
     */
    values?: string;
    /**
     * Styles applied to the color.
     */
    color?: string;
    /**
     * Styles applied to the separator between color and title.
     */
    separatorColor?: string;
    /**
     * Styles applied to the separator.
     */
    separator?: string;
    /**
     * Styles applied to the values wrapper.
     */
    valueWrapper?: string;
  };
  /**
   * If true, the tooltip is shown.
   */
  open?: boolean;
  /**
   * Tooltip placement.
   */
  placement?: TooltipPlacementType;
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
  TransitionComponent?: any;
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
};

/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 */

export const HvTooltip = forwardRef((props: TooltipProps, ref) => {
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
    TransitionProps = { timeout: 400, placement: placement },
    ...others
  } = props;

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
        tooltip: useSingle ? classes?.tooltip : classes?.tooltipMulti,
        popper: classes?.popper,
      }}
      title={title}
      PopperProps={{
        sx: popperSx(useSingle),
      }}
      {...others}
    >
      {children}
    </MuiTooltip>
  );
});
