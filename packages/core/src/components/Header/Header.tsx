import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  const Styled = styled("header")({
    display: "flex",
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
    borderTop: theme.header.borderTop,
    height: theme.header.height,
    backgroundColor: theme.colors.atmo1,
    boxShadow: theme.shadows.md,
    alignItems: "center",
  });

  return <Styled>{children}</Styled>;
};

Header.displayName = "Header";
