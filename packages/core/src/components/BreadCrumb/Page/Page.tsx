import {
  HvBreadCrumbPathElement,
  HvOverflowTooltip,
  HvTypography,
} from "@core/components";
import { ExtractNames } from "@core/utils";
import startCase from "lodash/startCase";
import { MouseEvent } from "react";
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
      <HvOverflowTooltip data={startCase(elem.label)} />
    </HvTypography>
  );
};
