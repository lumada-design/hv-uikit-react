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
    justifyContent: "center",
    paddingTop: 90
  }
};

const TooltipControl = (
  <button type="button" style={styling.button}>
    <HvTypography variant="normalText">Hover here</HvTypography>
  </button>
);

const data = (
  <HvTypography variant="infoText">
    Tooltips can showcase truncated text. The text should be concise and not
    redundant.
  </HvTypography>
);

export default (
  <div style={styling.placeholder}>
    <Tooltip tooltipData={data} tooltipAnchor={TooltipControl} />
  </div>
);
