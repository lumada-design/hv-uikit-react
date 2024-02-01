import { HvButton, HvButtonProps } from "../../Button";
import { HvTooltip, HvTooltipProps } from "../../Tooltip";

export interface IconButtonProps
  extends Omit<HvButtonProps, "icon" | "title" | "component"> {
  title: React.ReactNode;
  placement?: HvTooltipProps["placement"];
  onClick?: HvButtonProps["onClick"];
}

/** An `HvButton` of type icon wrapped in a tooltip  */
export const IconButton = ({
  title,
  placement = "top",
  ...others
}: IconButtonProps) => (
  <HvTooltip enterDelay={500} title={title} placement={placement}>
    <HvButton focusableWhenDisabled icon {...others} />
  </HvTooltip>
);
