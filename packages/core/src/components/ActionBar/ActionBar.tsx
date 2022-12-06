import clsx from "clsx";
import { StyledRoot } from "./ActionBar.styles";

export interface ActionBarProps extends BaseProps {
  /** Id to be applied to the root node. */
  id?: string;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
  };
}

export const ActionBar = (props: ActionBarProps) => {
  const { classes, className, id, children, ...others } = props;

  return (
    <StyledRoot id={id} className={clsx(classes?.root, className)} {...others}>
      {children}
    </StyledRoot>
  );
};
