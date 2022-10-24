import styled from "@emotion/styled";

export interface HeaderNavigationProps {
  children?: React.ReactNode;
}

export const HeaderNavigation = ({ children }: HeaderNavigationProps) => {
  const Styled = styled("span")({});

  return <Styled>{children}</Styled>;
};

HeaderNavigation.displayName = "HeaderNavigation";
