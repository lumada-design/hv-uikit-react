import clsx from "clsx";
import { HvBaseProps } from "~/types";
import { StyledRoot } from "./ActionBar.styles";
import actionBarClasses, { HvActionBarClasses } from "./actionBarClasses";

export interface HvActionBarProps extends HvBaseProps {
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvActionBarClasses;
}

export const HvActionBar = (props: HvActionBarProps) => {
  const { classes, className, id, children, ...others } = props;

  return (
    <StyledRoot
      id={id}
      className={clsx(actionBarClasses.root, classes?.root, className)}
      {...others}
    >
      {children}
    </StyledRoot>
  );
};
