import { useState } from "react";

import { HvTypography } from "@core/Typography";
import {
  HvTooltip,
  HvTooltipPlacementType,
  HvTooltipProps,
} from "@core/Tooltip";
import { HvBaseProps } from "@core/types/generic";

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
    // eslint-disable-next-line @typescript-eslint/default-param-last
    label = "",
    placement: HvTooltipPlacementType,
    hideTooltip?: (event: React.MouseEvent<HTMLDivElement>) => boolean,
    tooltipProps?: Partial<HvTooltipProps>,
    tooltipContainerProps?: HvBaseProps
  ) =>
  (props) => {
    const [isHoverDisabled, setIsHoverDisabled] = useState<boolean | undefined>(
      false
    );
    const [open, setOpen] = useState<boolean>(false);

    const title = <HvTypography>{label}</HvTypography>;

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
        title={title}
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
