import { useMemo } from "react";
import { withTooltip } from "@hv/uikit-react-core";

const hideTooltip = (evt) => {
  const isOverFlow =
    evt.target.children.length > 1
      ? Array.of(...evt.target.children).some((child) => child.scrollWidth > child.clientWidth)
      : evt.target.scrollWidth > evt.target.clientWidth;
  return !isOverFlow;
};

const wrapperTooltip = (Component, label) => {
  const ComponentFunction = () => Component;
  return withTooltip(ComponentFunction, label, "top", hideTooltip);
};

const NavigationOption = (label) => {
  const NavOpt = useMemo(() => wrapperTooltip(label, label), [label]);
  return NavOpt;
};

export default NavigationOption;
