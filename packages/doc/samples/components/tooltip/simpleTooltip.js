import React from "react";
import Tooltip from "@hv/uikit-react-core/dist/Tooltip";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const styling = {
  button: {
    border: "none",
    background: "transparent"
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
  <button type="button" style={styling.button}>
    <HvTypography variant="normalText">Hover here</HvTypography>
  </button>
);

const TooltipOpen = (
  <button type="button" style={styling.button}>
    <HvTypography variant="normalText">Tooltip open</HvTypography>
  </button>
);

const data = <HvTypography variant="infoText">Grid View</HvTypography>;

export default (
  <div style={styling.placeholder}>
    <Tooltip tooltipData={data} tooltipAnchor={TooltipHover} />
    <Tooltip tooltipData={data} tooltipAnchor={TooltipOpen} open />
  </div>
);
