import { BaseProps } from "types/base";
import { HeaderRoot, StyledAppBar } from "./Header.styles";

export type HeaderPosition =
  | "fixed"
  | "absolute"
  | "sticky"
  | "static"
  | "relative";

export interface HeaderProps extends BaseProps {
  /** The position of the header bar */
  position?: HeaderPosition;
}

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const Header = (props: HeaderProps) => {
  const { children, position = "fixed" } = props;
  return (
    <StyledAppBar position={position}>
      <HeaderRoot>{children}</HeaderRoot>
    </StyledAppBar>
  );
};
