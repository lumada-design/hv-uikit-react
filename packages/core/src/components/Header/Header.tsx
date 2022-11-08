import { BaseProps } from "types/base";
import { DivStyledAppBar, HeaderRoot } from "./Header.styles";

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
export const Header = ({
  children,
  position = "fixed",
}: HeaderProps): JSX.Element => {
  return (
    <DivStyledAppBar position={position}>
      <HeaderRoot>{children}</HeaderRoot>
    </DivStyledAppBar>
  );
};
