import { useState } from "react";

import { HvTooltip, HvTooltipPlacementType, HvTooltipProps } from "../Tooltip";
import { HvBaseProps } from "../types/generic";

const styles: { truncate: React.CSSProperties } = {
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

export const withTooltip =
  (
    Component: React.FunctionComponent,
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    label = "",
    placement: HvTooltipPlacementType,
    hideTooltip?: (event: React.MouseEvent<HTMLDivElement>) => boolean,
    tooltipProps?: Partial<HvTooltipProps>,
    tooltipContainerProps?: HvBaseProps,
  ) =>
  (props) => {
    const [isHoverDisabled, setIsHoverDisabled] = useState<boolean | undefined>(
      false,
    );
    const [open, setOpen] = useState<boolean>(false);

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      const isHidden = hideTooltip?.(event);
      setIsHoverDisabled(isHidden);
      setOpen(!isHidden);
    };

    const handleMouseLeave = () => {
      setIsHoverDisabled(false);
      setOpen(false);
    };

    return (
      <HvTooltip
        style={{ ...styles.truncate }}
        disableHoverListener={isHoverDisabled}
        disableFocusListener
        disableTouchListener
        title={label}
        open={open}
        placement={placement}
        {...tooltipProps}
      >
        <div
          {...tooltipContainerProps}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Component {...props} />
        </div>
      </HvTooltip>
    );
  };
