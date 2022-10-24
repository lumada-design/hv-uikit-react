import styled from "@emotion/styled";

export interface HeaderBrandProps {
  children?: React.ReactNode;
}

export const HeaderBrand = ({ children }: HeaderBrandProps) => {
  const Styled = styled("span")({});

  return <Styled>{children}</Styled>;
};

HeaderBrand.displayName = "HeaderBrand";
