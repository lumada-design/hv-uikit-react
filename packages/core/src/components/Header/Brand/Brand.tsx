import styled from "@emotion/styled";
import { themeVars } from "theme";

export interface HeaderProps {}

const Brand: React.FC<HeaderProps> = ({ children }) => {
  const Styled = styled("span")({
    fontWeight: themeVars.fontWeight.normal,
  });

  return <Styled>{children}</Styled>;
};

export default Brand;
