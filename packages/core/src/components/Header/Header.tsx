import styled from "@emotion/styled";
import { themeVars, themeUtils } from "theme";

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const Styled = styled("header")({
    display: "flex",
    padding: `${themeUtils.space(1)} ${themeUtils.space(3)}`,
    borderTop: themeVars.header.borderTop,
    height: themeVars.header.height,
    backgroundColor: themeVars.colors.atmo1,
    boxShadow: themeVars.shadows.md,
    alignItems: "center",
  });

  return <Styled>{children}</Styled>;
};

if (process.env.NODE_ENV !== "production") {
  Header.displayName = "Header";
}
