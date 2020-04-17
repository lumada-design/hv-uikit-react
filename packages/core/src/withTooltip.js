import React, { useState } from "react";
import Typography from "./Typography";
import Tooltip from "./Tooltip";

const withTooltip = (
  Component,
  label = "",
  placement,
  evaluationExpression = evt => evt.target.scrollWidth > evt.target.clientWidth
) => props => {
  const [showTooltip, setShowTooltip] = useState(false);
  const styles = {
    truncate: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  };

  const handleMouseEnter = evt => {
    setShowTooltip(evaluationExpression(evt));
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const tooltipData = <Typography variant="infoText">{label}</Typography>;

  return (
    <Tooltip
      style={{ ...styles.truncate }}
      disableFocusListener
      disableTouchListener
      tooltipData={tooltipData}
      open={showTooltip}
      placement={placement}
    >
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Component {...props} />
      </div>
    </Tooltip>
  );
};

export default withTooltip;
