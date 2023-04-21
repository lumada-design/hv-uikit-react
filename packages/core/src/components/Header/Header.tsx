import { clsx } from "clsx";
import { HvBaseProps } from "@core/types";
import { StyledHeaderRoot, StyledAppBar } from "./Header.styles";
import headerClasses, { HvHeaderClasses } from "./headerClasses";

export type HvHeaderPosition =
  | "fixed"
  | "absolute"
  | "sticky"
  | "static"
  | "relative";

export interface HvHeaderProps extends HvBaseProps {
  /** The position of the header bar */
  position?: HvHeaderPosition;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvHeaderClasses;
}

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const HvHeader = (props: HvHeaderProps) => {
  const { className, classes, children, position = "fixed", ...others } = props;

  return (
    <StyledAppBar
      className={clsx(
        className,
        classes?.root,
        headerClasses.root,
        classes?.backgroundColor,
        headerClasses.backgroundColor
      )}
      $position={position}
      {...others}
    >
      <StyledHeaderRoot className={clsx(classes?.header, headerClasses.header)}>
        {children}
      </StyledHeaderRoot>
    </StyledAppBar>
  );
};
