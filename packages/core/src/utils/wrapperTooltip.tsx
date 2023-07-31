import { withTooltip } from "@core/hocs/withTooltip";

const hideTooltip = (evt) => {
  const isOverFlow =
    evt.target.children.length > 1
      ? Array.of(...evt.target.children).some(
          (child) => child.scrollWidth > child.clientWidth
        )
      : evt.target.scrollWidth > evt.target.clientWidth;

  return !isOverFlow;
};

export const wrapperTooltip = (hasTooltips, Component, label) => {
  const ComponentFunction = () => Component;
  return hasTooltips
    ? withTooltip(ComponentFunction, label, "top", hideTooltip)
    : ComponentFunction;
};
