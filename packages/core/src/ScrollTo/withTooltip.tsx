import { HvTypography, HvTypographyProps } from "../Typography";
import { withTooltip as withTooltipUtil } from "../hocs/withTooltip";

import { HvScrollToTooltipPositions } from "./types";

const hideTooltip = (event: React.MouseEvent<HTMLDivElement>) => {
  const isOverFlow =
    (event.target as HTMLDivElement).children.length > 1
      ? Array.from(event.currentTarget.children).some(
          (child) => child.scrollWidth > child.clientWidth
        )
      : (event.target as HTMLDivElement).scrollWidth >
        (event.target as HTMLDivElement).clientWidth;
  return !isOverFlow;
};

export const withTooltip = (
  label: string,
  componentType: React.ElementType,
  tooltipPosition: HvScrollToTooltipPositions = "top",
  hideOnOverflow: boolean = true
) => {
  const component = (props: HvTypographyProps) => (
    <HvTypography component={componentType} {...props}>
      {props.children}
    </HvTypography>
  );

  const hideTooltipFunc = hideOnOverflow ? hideTooltip : undefined;

  return withTooltipUtil(component, label, tooltipPosition, hideTooltipFunc);
};
