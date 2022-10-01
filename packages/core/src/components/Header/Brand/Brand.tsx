import styled from "@emotion/styled";
import { themeVars } from "theme";

export interface HeaderBrandProps {}

export const HeaderBrand: React.FC<HeaderBrandProps> = ({ children }) => {
  const Styled = styled("span")({});

  return <Styled>{children}</Styled>;
};

if (process.env.NODE_ENV !== "production") {
  HeaderBrand.displayName = "HeaderBrand";
}
