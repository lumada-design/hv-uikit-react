import React from "react";
import Tooltip from "@hv/uikit-react-core/dist/Tooltip";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const styling = {
  outerDiv: {
    width: 100,
    cursor: "pointer"
  },
  placeholder: {
    display: "flex",
    textAlign: "center",
    justifyContent: "space-between",
    width: 600,
    marginLeft: "18%",
    paddingTop: 80
  }
};

const TooltipHover = (
  <div tabIndex="0" style={styling.outerDiv}>
    <HvTypography variant="normalText">Hover here</HvTypography>
  </div>
);

const TooltipOpen = (
  <div tabIndex="0" style={styling.outerDiv}>
    <HvTypography variant="normalText">Tooltip open</HvTypography>
  </div>
);

const data = <HvTypography variant="infoText">Grid View</HvTypography>;

export default (
  <div style={styling.placeholder}>
    <Tooltip tooltipData={data} tooltipAnchor={TooltipHover} />
    <Tooltip tooltipData={data} tooltipAnchor={TooltipOpen} open />
  </div>
);
