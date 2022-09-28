import styled from "@emotion/styled";

export interface HeaderProps {}

const Brand: React.FC<HeaderProps> = ({ children }) => {
  const Styled = styled("header")({});

  return <Styled>{children}</Styled>;
};

export default Brand;
