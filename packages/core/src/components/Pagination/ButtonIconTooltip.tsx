import {
  HvButton,
  HvButtonProps,
  HvTooltip,
  HvTypography,
} from "@core/components";
import { ReactNode } from "react";

interface ButtonIconTooltipProps extends HvButtonProps {
  tooltip: ReactNode;
  children: ReactNode;
}

const ButtonIconTooltip = ({
  tooltip,
  children,
  ...buttonProps
}: ButtonIconTooltipProps) => {
  return (
    <HvTooltip title={<HvTypography>{tooltip}</HvTypography>}>
      <div>
        <HvButton icon variant="secondaryGhost" {...buttonProps}>
          {children}
        </HvButton>
      </div>
    </HvTooltip>
  );
};
export default ButtonIconTooltip;
