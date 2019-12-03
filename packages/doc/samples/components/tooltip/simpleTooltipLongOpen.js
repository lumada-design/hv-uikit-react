import React from "react";
import Tooltip from "@hv/uikit-react-core/dist/Tooltip";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const styling = {
  outerDiv:{
    width: 100,
    cursor: "pointer",
  },
  placeholder: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 90
  },
  typographyAligner:{
    textAlign: "center"
  }
};

const TooltipControl = (() => {
  return (
    <div tabIndex="0" style={styling.outerDiv}>
      <div style={styling.typographyAligner}>
        <HvTypography variant="normalText">Tooltip open</HvTypography>
      </div>
    </div>
  );
})();

const data = (() => {
  return (
    <HvTypography variant="infoText">Tooltips can showcase truncated text. The text should be concise and not redundant.</HvTypography>
  );
})()

export default (
  <div style={styling.placeholder}>
    <>
      <Tooltip tooltipData={data} tooltipAnchor={TooltipControl} open={true} />
    </>
  </div>
);
