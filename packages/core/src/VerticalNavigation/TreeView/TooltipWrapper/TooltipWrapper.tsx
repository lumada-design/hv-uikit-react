import { HvTooltip, HvTooltipPlacementType } from "../../../Tooltip";
import { HvTypography } from "../../../Typography";

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
      <HvTooltip
        title={<HvTypography>{label}</HvTypography>}
        placement={placement}
      >
        {children}
      </HvTooltip>
    );
  }
  return children;
};
