import React from "react";
import Tooltip from "@hv/uikit-react-core/dist/Tooltip";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const styling = {
  outerDiv:{
    width: 100,
    cursor: "pointer",
    color: "#414141"
  },
  placeholder: {
    display: "flex",
    justifyContent: "space-between",
    width: 600,
    marginLeft: "18%",
    paddingTop: 80
  },
  typographyAligner:{
    textAlign: "center"
  }
};

const TooltipHover = (() => {
  return (
    <div tabIndex="0" style={styling.outerDiv}>
      <div style={styling.typographyAligner}>
        <HvTypography variant="normalText">Hover here</HvTypography>
      </div>
    </div>
  );
})();

const TooltipOpen = (() => {
  return (
    <div tabIndex="0" style={styling.outerDiv}>
      <div style={styling.typographyAligner}>
        <HvTypography variant="normalText">Tooltip open</HvTypography>
      </div>
    </div>
  );
})();

const data = (() => {
  return <HvTypography variant="infoText">Grid View</HvTypography>;
})();

export default (
  <div style={styling.placeholder}>
    <>
      <Tooltip tooltipData={data} tooltipAnchor={TooltipHover} />
      <Tooltip tooltipData={data} tooltipAnchor={TooltipOpen} open={true} />
    </>
  </div>
);
