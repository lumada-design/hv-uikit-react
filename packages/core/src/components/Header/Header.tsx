import styled from "@emotion/styled";
import { themeVars } from "theme";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const StyledContainer = styled("div")({
    width: "100%",
    height: 100,
    padding: themeVars.spacing[2],
    borderTopWidth: 4,
    borderTopColor: "#CC0000",
    backgroundColor: "#E8E8E8",
  });

  return <StyledContainer>{children}</StyledContainer>;
};

export default Header;
