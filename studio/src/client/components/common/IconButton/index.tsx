import { clsx } from "clsx";
import {
  HvTypography,
  HvTooltip,
  HvButton,
  HvTooltipPlacementType,
} from "@hitachivantara/uikit-react-core";

import classes from "./styles";

interface IconButtonProps {
  title?: string;
  selected?: boolean;
  style?: React.CSSProperties;
  tooltipPlacement?: HvTooltipPlacementType;
  children: JSX.Element;
  onClick?: () => void;
}

export const IconButton = ({
  title,
  selected,
  onClick,
  children,
  style,
  tooltipPlacement = "top",
}: IconButtonProps) => (
  <HvTooltip
    title={<HvTypography>{title}</HvTypography>}
    placement={tooltipPlacement}
  >
    <HvButton
      icon
      variant="secondaryGhost"
      onClick={onClick}
      className={clsx(classes.button, {
        [classes.selected]: selected,
      })}
      style={style}
    >
      {children}
    </HvButton>
  </HvTooltip>
);
