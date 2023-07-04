import { ReactNode } from "react";
import {
  HvTooltip,
  HvTypography,
  HvButton,
  HvButtonProps,
} from "@hitachivantara/uikit-react-core";

export interface IconButtonProps extends Omit<HvButtonProps, "icon"> {
  label: string;
  icon: ReactNode;
  onClick?: HvButtonProps["onClick"];
}

/** An `HvButton` of type icon wrapped in a tooltip  */
export const IconButton = ({ label, icon, ...others }: IconButtonProps) => {
  return (
    <HvTooltip enterDelay={500} title={<HvTypography>{label}</HvTypography>}>
      <span>
        <HvButton icon variant="secondaryGhost" aria-label={label} {...others}>
          {icon}
        </HvButton>
      </span>
    </HvTooltip>
  );
};
