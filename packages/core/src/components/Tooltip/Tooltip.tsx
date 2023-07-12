import {
  Fade,
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";
import { forwardRef, ReactElement } from "react";
import { clsx } from "clsx";
import { useTheme } from "@core/hooks";
import { popperSx } from "./Tooltip.styles";
import tooltipClasses, { HvTooltipClasses } from "./tooltipClasses";

export type HvTooltipPlacementType = MuiTooltipProps["placement"];

export interface HvTooltipProps extends Omit<MuiTooltipProps, "classes"> {
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
  /** @inheritdoc */
  title: MuiTooltipProps["title"];
  /** @inheritdoc */
  TransitionComponent?: MuiTooltipProps["TransitionComponent"];
  /** @inheritdoc */
  TransitionProps?: MuiTooltipProps["TransitionProps"];
  /**
   * Defines if should use a single or multiline tooltip.
   */
  useSingle?: boolean;
  /**
   * Node to apply the tooltip.
   */
  children: ReactElement;
  /**
   * Id attribute value of an HTML Element to have the tooltip appended to it.
   */
  containerId?: string;
}

/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 * Accessibility-wise, the tooltip automatically labels the `children` content.
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
    containerId,
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
        container:
          typeof window !== "undefined"
            ? document.getElementById(containerId || rootId || "") ||
              document.body
            : undefined,
      }}
      {...others}
    >
      {children}
    </MuiTooltip>
  );
});
