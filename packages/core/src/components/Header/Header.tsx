import { HvBaseProps } from "types";
import { HeaderRoot, StyledAppBar } from "./Header.styles";

export type HvHeaderPosition =
  | "fixed"
  | "absolute"
  | "sticky"
  | "static"
  | "relative";

export type HvHeaderProps = HvBaseProps & {
  /** The position of the header bar */
  position?: HvHeaderPosition;
};

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const HvHeader = (props: HvHeaderProps) => {
  const { children, position = "fixed" } = props;
  return (
    <StyledAppBar position={position}>
      <HeaderRoot>{children}</HeaderRoot>
    </StyledAppBar>
  );
};
