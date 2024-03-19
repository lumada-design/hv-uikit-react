import { HvTypography } from "../../Typography";
import { HvOverflowTooltip } from "../../OverflowTooltip";
import { ExtractNames } from "../../utils/classes";
import { useDefaultProps } from "../../hooks/useDefaultProps";

import { HvBreadCrumbPathElement } from "../types";
import { staticClasses, useClasses } from "./Page.styles";

export { staticClasses as breadCrumbPageClasses };

export type HvBreadCrumbPageClasses = ExtractNames<typeof useClasses>;

export interface HvBreadCrumbPageProps {
  component?: React.ElementType;
  onClick?: (event: React.MouseEvent<HTMLElement>, data: any) => void;
  elem: HvBreadCrumbPathElement;
  classes?: HvBreadCrumbPageClasses;
}

export const HvBreadCrumbPage = (props: HvBreadCrumbPageProps) => {
  const {
    component,
    onClick,
    elem,
    classes: classesProp,
  } = useDefaultProps("HvBreadCrumbPage", props);

  const { classes, cx } = useClasses(classesProp);

  const { label, path, ...others } = elem;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onClick?.(event, elem);
  };

  return (
    <HvTypography
      noWrap
      variant="label"
      component={component || "a"}
      href={elem.path}
      onClick={onClick && handleClick}
      className={cx(classes.link, classes.label, classes.a)}
      {...others}
    >
      <HvOverflowTooltip data={elem.label} />
    </HvTypography>
  );
};
