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
    justifyContent: "center",
    paddingTop: 90
  }
};

const TooltipControl = (
  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
  <div tabIndex="0" style={styling.outerDiv}>
    <HvTypography variant="normalText">Tooltip open</HvTypography>
  </div>
);

const data = (
  <HvTypography variant="infoText">
    Tooltips can showcase truncated text. The text should be concise and not redundant.
  </HvTypography>
);

export default (
  <div style={styling.placeholder}>
    <Tooltip tooltipData={data} open>
      {TooltipControl}
    </Tooltip>
  </div>
);
