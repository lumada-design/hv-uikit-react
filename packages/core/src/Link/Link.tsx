import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvBaseProps } from "../types/generic";
import { ExtractNames } from "../utils/classes";
import { staticClasses, useClasses } from "./Link.styles";

export { staticClasses as linkClasses };

export type HvLinkClasses = ExtractNames<typeof useClasses>;

export interface HvLinkProps extends HvBaseProps<HTMLAnchorElement, "onClick"> {
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: any,
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

  return (
    <a
      href={route}
      onClick={(event) => {
        if (!onClick) return;

        event.preventDefault();
        onClick?.(event, data);
      }}
      className={cx(classes.a, className)}
      {...others}
    >
      {children}
    </a>
  );
};
