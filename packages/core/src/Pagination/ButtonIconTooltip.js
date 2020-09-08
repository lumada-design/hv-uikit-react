import React from "react";
import { HvButton, HvTooltip, HvTypography } from "..";

// eslint-disable-next-line react/prop-types
const ButtonIconTooltip = ({ tooltip, children, ...buttonProps }) => (
  <HvTooltip title={<HvTypography>{tooltip}</HvTypography>}>
    <HvButton icon {...buttonProps}>
      {children}
    </HvButton>
  </HvTooltip>
);

export default ButtonIconTooltip;
