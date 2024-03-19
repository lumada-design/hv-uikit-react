import { forwardRef } from "react";
import Tooltip, {
  TooltipProps as MuiTooltipProps,
} from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

import { useTheme } from "../hooks/useTheme";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { getElementById } from "../utils/document";
import { ExtractNames } from "../utils/classes";

import { staticClasses, useClasses } from "./Tooltip.styles";

export { staticClasses as tooltipClasses };

export type HvTooltipClasses = ExtractNames<typeof useClasses>;
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
  children: React.ReactElement;
  /**
   * Id attribute value of an HTML Element to have the tooltip appended to it.
   */
  containerId?: string;
}

/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 * Accessibility-wise, the tooltip automatically labels the `children` content.
 *
 * If you are looking to wrap an icon only button with a tooltip, take a look at the `HvIconButton` component
 * which offers you thus behavior out of the box.
 */
export const HvTooltip = forwardRef((props: HvTooltipProps, ref) => {
  const {
    className,
    classes: classesProp,
    open,
    enterDelay = 300,
    placement = "top",
    useSingle = true,
    children,
    title,
    TransitionComponent = Fade,
    TransitionProps = { timeout: 400, placement: "top" },
    containerId,
    ...others
  } = useDefaultProps("HvTooltip", props);

  const { rootId } = useTheme();
  const { classes } = useClasses(classesProp);

  return (
    <Tooltip
      ref={ref}
      open={open ?? undefined}
      enterDelay={enterDelay}
      placement={placement}
      TransitionComponent={TransitionComponent}
      TransitionProps={TransitionProps}
      className={className}
      classes={{
        tooltip: useSingle ? classes.tooltip : classes.tooltipMulti,
        popper: classes.popper,
      }}
      title={title}
      PopperProps={{
        container: getElementById(containerId || rootId),
      }}
      {...others}
    >
      {children}
    </Tooltip>
  );
});
