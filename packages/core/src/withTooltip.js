import React, { useState } from "react";
import Typography from "./Typography";
import Tooltip from "./Tooltip";

const styles = {
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

const withTooltip =
  (Component, label = "", placement, hideTooltip, tooltipProps, tooltipContainerProps) =>
  (props) => {
    const [isHoverDisabled, setIsHoverDisabled] = useState(false);
    const [open, setOpen] = useState(false);

    const title = <Typography>{label}</Typography>;

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
      <Tooltip
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
      </Tooltip>
    );
  };

export default withTooltip;
