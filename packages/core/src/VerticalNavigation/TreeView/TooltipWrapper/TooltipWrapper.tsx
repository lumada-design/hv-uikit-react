import { HvTooltip, HvTooltipPlacementType } from "../../../Tooltip";

interface TooltipWrapperProps {
  showTooltip: boolean;
  label: string;
  children: React.ReactElement;
  placement?: HvTooltipPlacementType;
}

export const TooltipWrapper = ({
  showTooltip,
  label,
  children,
  placement = "right",
}: TooltipWrapperProps) => {
  if (showTooltip) {
    return (
      <HvTooltip title={label} placement={placement}>
        {children}
      </HvTooltip>
    );
  }
  return children;
};
