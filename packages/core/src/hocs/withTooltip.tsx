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

/** @deprecated wrap your component with `HvTooltip` */
export const withTooltip =
  (
    Component: React.FunctionComponent,
    // eslint-disable-next-line @typescript-eslint/default-param-last
    label = "",
    placement: HvTooltipPlacementType,
    hideTooltip?: (event: React.MouseEvent<HTMLDivElement>) => boolean,
    tooltipProps?: Partial<HvTooltipProps>,
    tooltipContainerProps?: HvBaseProps,
  ) =>
  // eslint-disable-next-line react/display-name
  (props: any) => {
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
