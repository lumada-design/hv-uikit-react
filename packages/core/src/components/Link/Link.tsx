import clsx from "clsx";
import { HvBaseProps } from "../../types";
import { StyledA, StyledBox } from "./Link.styles";
import { linkClasses, HvLinkClasses } from ".";

export type HvLinkProps = HvBaseProps & {
  as?: React.ElementType | undefined;
  onClick?: any;
  tabIndex?: number;
  route?: string;
  data?: any;
  children: any;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvLinkClasses;
};

export const HvLink = ({
  as = "div",
  tabIndex = 0,
  onClick,
  classes,
  className,
  route,
  data,
  children,
  ...others
}: HvLinkProps) => {
  return onClick ? (
    <StyledBox
      role="button"
      tabIndex={tabIndex}
      onClick={(event) => onClick?.(event, data)}
      className={clsx(className, linkClasses.a, classes?.a)}
      as={as}
      {...others}
    >
      {children}
    </StyledBox>
  ) : (
    <StyledA
      href={route}
      className={clsx(className, linkClasses.a, classes?.a)}
    >
      {children}
    </StyledA>
  );
};
