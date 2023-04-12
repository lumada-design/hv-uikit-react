import clsx from "clsx";
import { HvOverflowTooltip } from "~/components";
import startCase from "lodash/startCase";
import { MouseEventHandler } from "react";
import pageClasses, { HvPageClasses } from "./pageClasses";
import { StyledLink, StyledTypography } from "./Page.styles";

export interface HvPageElement {
  path?: string;
  label?: string;
}

export interface HvPageProps {
  Component?: React.ElementType;
  onClick?: (
    event: MouseEventHandler<HTMLAnchorElement>,
    data: any
  ) => void | undefined;
  elem: HvPageElement;
  classes?: HvPageClasses;
}

export const HvPage = ({
  /* Component, */ onClick,
  elem,
  classes,
}: HvPageProps) => {
  return (
    <StyledLink
      route={elem.path}
      //component={Component}
      onClick={onClick}
      data={elem}
      classes={{ a: clsx(pageClasses.a, classes?.a) }}
    >
      <StyledTypography
        noWrap
        component="div"
        variant="label"
        className={clsx(
          pageClasses.link,
          classes?.link,
          pageClasses.label,
          classes?.label
        )}
      >
        <HvOverflowTooltip data={startCase(elem.label)} />
      </StyledTypography>
    </StyledLink>
  );
};
