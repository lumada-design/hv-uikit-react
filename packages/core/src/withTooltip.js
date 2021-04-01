import React from "react";
import Typography from "./Typography";
import Tooltip from "./Tooltip";

const withTooltip = (Component, label = "", placement, tooltipProps, tooltipContainerProps) => (
  props
) => {
  const styles = {
    truncate: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };

  const title = <Typography>{label}</Typography>;

  return (
    <Tooltip
      style={{ ...styles.truncate }}
      disableFocusListener
      disableTouchListener
      title={title}
      placement={placement}
      {...tooltipProps}
    >
      <div {...tooltipContainerProps}>
        <Component {...props} />
      </div>
    </Tooltip>
  );
};

export default withTooltip;
