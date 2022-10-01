import styled from "@emotion/styled";
import { themeUtils } from "theme";

export interface HeaderActionsProps {}

export const HeaderActions: React.FC<HeaderActionsProps> = ({ children }) => {
  const Styled = styled("span")({
    marginLeft: "auto",
    display: "inline-flex",
    gap: themeUtils.space(2),
  });

  return <Styled>{children}</Styled>;
};

if (process.env.NODE_ENV !== "production") {
  HeaderActions.displayName = "HeaderActions";
}
