import { ReactNode } from "react";

import { HvButton, HvButtonProps } from "@core/components/Button";
import { HvTooltip } from "@core/components/Tooltip";
import { HvTypography } from "@core/components/Typography";

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
        <HvButton icon {...buttonProps}>
          {children}
        </HvButton>
      </div>
    </HvTooltip>
  );
};
export default ButtonIconTooltip;
