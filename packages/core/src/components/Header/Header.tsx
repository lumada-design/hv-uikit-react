import styled from "@emotion/styled";
import { themeVars, themeUtils } from "theme";

export interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
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

Header.displayName = "Header";
