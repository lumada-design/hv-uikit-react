import { MouseEventHandler } from "react";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Link.styles";

export { staticClasses as linkClasses };

export type HvLinkClasses = ExtractNames<typeof useClasses>;

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
  const {
    onClick,
    classes: classesProp,
    className,
    route,
    data,
    children,
    ...others
  } = useDefaultProps("HvLink", props);

  const { classes, cx } = useClasses(classesProp);

  const handleClick = (event) => {
    event.preventDefault();

    onClick?.(event, data);
  };

  return (
    <a
      href={route}
      onClick={onClick != null ? handleClick : undefined}
      className={cx(classes.a, className)}
      {...others}
    >
      {children}
    </a>
  );
};
