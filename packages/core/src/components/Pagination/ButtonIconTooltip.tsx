import { HvButton, HvTooltip, HvTypography } from "@core/components";

const ButtonIconTooltip = ({ tooltip, children, ...buttonProps }) => {
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
