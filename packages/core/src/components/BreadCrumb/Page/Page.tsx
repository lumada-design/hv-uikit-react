import clsx from "clsx";
import { HvOverflowTooltip } from "components";
import { startCase } from "lodash";
import { MouseEventHandler } from "react";
import { HvPageClasses, pageClasses } from ".";
import { StyledLink, StyledTypography } from "./Page.styles";

export type HvPageElement = {
  path?: string;
  label?: string;
};

export type HvPageProps = {
  Component?: React.ElementType;
  onClick?: (
    event: MouseEventHandler<HTMLDivElement>,
    data: any
  ) => void | undefined;
  elem: HvPageElement;
  classes?: HvPageClasses;
};

export const HvPage = ({ Component, onClick, elem, classes }: HvPageProps) => {
  return (
    <StyledLink
      route={elem.path}
      component={Component}
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
