import { withTooltip } from "../hocs/withTooltip";

const hideTooltip = (evt: any) => {
  const isOverFlow =
    evt.target.children.length > 1
      ? Array.of(...evt.target.children).some(
          (child) => child.scrollWidth > child.clientWidth
        )
      : evt.target.scrollWidth > evt.target.clientWidth;

  return !isOverFlow;
};

export const wrapperTooltip = (
  hasTooltips: boolean,
  Component: any,
  label: any
) => {
  const ComponentFunction = () => Component;
  return hasTooltips
    ? withTooltip(ComponentFunction, label, "top", hideTooltip)
    : ComponentFunction;
};
