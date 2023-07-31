import { MouseEvent } from "react";

import { HvTypography } from "@core/components/Typography";
import { HvOverflowTooltip } from "@core/components/OverflowTooltip";
import { ExtractNames } from "@core/utils/classes";

import { HvBreadCrumbPathElement } from "../types";
import { staticClasses, useClasses } from "./Page.styles";

export { staticClasses as pageClasses };

export type HvPageClasses = ExtractNames<typeof useClasses>;

export interface HvPageProps {
  component?: React.ElementType;
  onClick?: (event: MouseEvent<HTMLElement>, data: any) => void;
  elem: HvBreadCrumbPathElement;
  classes?: HvPageClasses;
}

export const HvPage = ({
  component,
  onClick,
  elem,
  classes: classesProp,
}: HvPageProps) => {
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
