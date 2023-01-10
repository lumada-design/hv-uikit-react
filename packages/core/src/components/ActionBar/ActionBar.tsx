import clsx from "clsx";

import { HvBaseProps } from "types";
import { StyledRoot } from "./ActionBar.styles";

export type HvActionBarProps = HvBaseProps & {
  /** Id to be applied to the root node. */
  id?: string;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
  };
};

export const HvActionBar = (props: HvActionBarProps) => {
  const { classes, className, id, children, ...others } = props;

  return (
    <StyledRoot id={id} className={clsx(classes?.root, className)} {...others}>
      {children}
    </StyledRoot>
  );
};
