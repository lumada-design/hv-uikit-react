import styled from "@emotion/styled";

export interface HeaderBrandProps {
  children?: React.ReactNode;
}

export const HeaderBrand = ({ children }: HeaderBrandProps) => {
  const Styled = styled("span")({});

  return <Styled>{children}</Styled>;
};

if (process.env.NODE_ENV !== "production") {
  HeaderBrand.displayName = "HeaderBrand";
}
