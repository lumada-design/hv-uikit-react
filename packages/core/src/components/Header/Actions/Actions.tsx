import styled from "@emotion/styled";
import { themeUtils } from "theme";

export interface HeaderProps {}

const Actions: React.FC<HeaderProps> = ({ children }) => {
  const Styled = styled("header")({
    marginLeft: "auto",
    display: "inline-flex",
    gap: themeUtils.spacing(2),
  });

  return <Styled>{children}</Styled>;
};

export default Actions;
