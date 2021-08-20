import React from "react";
import { withTooltip as withTooltipUtil, HvTypography } from "..";

const hideTooltip = (evt) => {
  const isOverFlow =
    evt.target.children.length > 1
      ? Array.of(...evt.target.children).some((child) => child.scrollWidth > child.clientWidth)
      : evt.target.scrollWidth > evt.target.clientWidth;
  return !isOverFlow;
};

const withTooltip = (label, componentType, tooltipPosition = "top", hideOnOverflow = true) => {
  const component = (props) => (
    <HvTypography component={componentType} {...props}>
      {props.children}
    </HvTypography>
  );
  const hideTooltipFunc = hideOnOverflow ? hideTooltip : undefined;
  return withTooltipUtil(component, label, tooltipPosition, hideTooltipFunc);
};

export default withTooltip;
