import styled from "@emotion/styled";
import { themeUtils } from "@hitachivantara/uikit-styles";

export interface HeaderActionsProps {
  children?: React.ReactNode;
}

export const HeaderActions = ({ children }: HeaderActionsProps) => {
  const Styled = styled("span")({
    marginLeft: "auto",
    display: "inline-flex",
    gap: themeUtils.space(2),
  });

  return <Styled>{children}</Styled>;
};

HeaderActions.displayName = "HeaderActions";
