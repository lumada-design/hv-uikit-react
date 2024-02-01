import { HvButton, HvButtonProps } from "../Button";
import { HvTooltip, HvTooltipProps } from "../Tooltip";

export interface IconButtonProps extends Omit<HvButtonProps, "icon" | "title"> {
  title: React.ReactNode;
  placement?: HvTooltipProps["placement"];
  onClick?: HvButtonProps["onClick"];
}

/** An `HvButton` of type icon wrapped in a tooltip  */
export const IconButton = ({
  title,
  placement = "top",
  disabled,
  ...others
}: IconButtonProps) => {
  const button = <HvButton icon disabled={disabled} {...others} />;

  if (disabled) {
    return button;
  }

  return (
    <HvTooltip enterDelay={500} title={title} placement={placement}>
      {button}
    </HvTooltip>
  );
};
