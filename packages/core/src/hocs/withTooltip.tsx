import { useState } from "react";
import { HvTypography, HvTooltip } from "@core/components";

const styles = {
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

const withTooltip =
  (
    Component,
    // eslint-disable-next-line @typescript-eslint/default-param-last
    label = "",
    placement,
    hideTooltip,
    tooltipProps,
    tooltipContainerProps
  ) =>
  (props) => {
    const [isHoverDisabled, setIsHoverDisabled] = useState(false);
    const [open, setOpen] = useState(false);

    const title = <HvTypography>{label}</HvTypography>;

    const handleMouseEnter = (evt) => {
      const isHidden = hideTooltip?.(evt);
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

export default withTooltip;
