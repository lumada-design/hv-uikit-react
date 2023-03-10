import clsx from "clsx";
import { HvBaseProps } from "../../types";
import { StyledA } from "./Link.styles";
import { linkClasses, HvLinkClasses } from ".";
import { MouseEventHandler } from "react";

export type HvLinkProps = HvBaseProps<HTMLAnchorElement, { onClick }> & {
  onClick?: (
    event: MouseEventHandler<HTMLAnchorElement>,
    data: any
  ) => void | undefined;
  route?: string;
  data?: any;
  children: any;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvLinkClasses;
};

export const HvLink = ({
  onClick,
  classes,
  className,
  route,
  data,
  children,
  ...others
}: HvLinkProps) => {
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
