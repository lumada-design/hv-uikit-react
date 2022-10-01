import styled from "@emotion/styled";
import { themeVars, themeUtils } from "theme";

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const Styled = styled("header")({
    display: "flex",
    padding: `${themeUtils.space(1)} ${themeUtils.space(3)}`,
    borderTopWidth: 4,
    borderTopColor: themeVars.colors.sema4,
    backgroundColor: themeVars.colors.atmo1,
    boxShadow: themeVars.shadows.md,
    alignItems: "center",
    height: "44px",
  });

  return <Styled>{children}</Styled>;
};

if (process.env.NODE_ENV !== "production") {
  Header.displayName = "Header";
}
