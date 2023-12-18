import { MouseEvent } from "react";

import { HvTypography } from "@core/components/Typography";
import { HvOverflowTooltip } from "@core/components/OverflowTooltip";
import { ExtractNames } from "@core/utils/classes";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { HvBreadCrumbPathElement } from "../types";
import { staticClasses, useClasses } from "./Page.styles";

export { staticClasses as breadCrumbPageClasses };

export type HvBreadCrumbPageClasses = ExtractNames<typeof useClasses>;

export interface HvBreadCrumbPageProps {
  component?: React.ElementType;
  onClick?: (event: MouseEvent<HTMLElement>, data: any) => void;
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

  const handleClick = (event: MouseEvent<HTMLElement>) => {
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
