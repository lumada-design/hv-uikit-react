import React, { useState } from "react";
import { Tooltip } from "@material-ui/core";

const withTooltip = (Component, label = "") => props => {
  const [showTooltip, setShowTooltip] = useState(false);

  const styles = {
    truncate: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  };

  const handleMouseEnter = evt => {
    setShowTooltip(evt.target.scrollWidth > evt.target.clientWidth);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Tooltip
      style={{ ...styles.truncate }}
      disableFocusListener
      disableTouchListener
      title={label}
      open={showTooltip}
    >
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Component {...props} />
      </div>
    </Tooltip>
  );
};

export default withTooltip;
