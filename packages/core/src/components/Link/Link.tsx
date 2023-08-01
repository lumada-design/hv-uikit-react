import { clsx } from "clsx";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { MouseEventHandler } from "react";

import { HvBaseProps } from "@core/types/generic";

import { StyledA } from "./Link.styles";
import linkClasses, { HvLinkClasses } from "./linkClasses";

export interface HvLinkProps extends HvBaseProps<HTMLAnchorElement, "onClick"> {
  onClick?: (
    event: MouseEventHandler<HTMLAnchorElement>,
    data: any
  ) => void | undefined;
  route?: string;
  data?: any;
  children: any;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvLinkClasses;
}

export const HvLink = (props: HvLinkProps) => {
  const { onClick, classes, className, route, data, children, ...others } =
    useDefaultProps("HvLink", props);

  const handleClick = (event) => {
    event.preventDefault();

    onClick?.(event, data);
  };

  return (
    <StyledA
      href={route}
      onClick={onClick != null ? handleClick : undefined}
      className={clsx(className, linkClasses.a, classes?.a)}
      {...others}
    >
      {children}
    </StyledA>
  );
};
