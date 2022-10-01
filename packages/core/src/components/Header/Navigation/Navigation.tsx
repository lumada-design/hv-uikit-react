import styled from "@emotion/styled";

export interface HeaderNavigationProps {}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  children,
}) => {
  const Styled = styled("span")({});

  return <Styled>{children}</Styled>;
};

if (process.env.NODE_ENV !== "production") {
  HeaderNavigation.displayName = "HeaderNavigation";
}
