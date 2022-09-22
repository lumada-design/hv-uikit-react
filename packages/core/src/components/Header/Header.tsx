import styled from "@emotion/styled";
import { themeVars, spacingFn } from "theme";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const StyledContainer = styled("div")({
    width: "100%",
    height: "100%",
    padding: spacingFn(2),
    borderTopWidth: 4,
    borderTopColor: themeVars.colors.sema4,
    backgroundColor: themeVars.colors.atmo1,
  });

  return <StyledContainer>{children}</StyledContainer>;
};

export default Header;
