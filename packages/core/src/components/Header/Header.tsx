import { DivStyledAppBar, HeaderRoot } from "./Header.styles";

export type HeaderPosition =
  | "fixed"
  | "absolute"
  | "sticky"
  | "static"
  | "relative";

export interface HeaderProps extends DivProps {
  /** The position of the header bar */
  position?: HeaderPosition;
}

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const Header = ({ children, position = "fixed" }: HeaderProps) => {
  return (
    <DivStyledAppBar position={position}>
      <HeaderRoot>{children}</HeaderRoot>
    </DivStyledAppBar>
  );
};
