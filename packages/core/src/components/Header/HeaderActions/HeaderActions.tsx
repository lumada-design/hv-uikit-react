import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export interface HeaderActionsProps {
  children?: React.ReactNode;
}

export const HeaderActions = ({ children }: HeaderActionsProps) => {
  const Styled = styled("span")({
    marginLeft: "auto",
    display: "inline-flex",
    gap: theme.spacing(2),
  });

  return <Styled>{children}</Styled>;
};

HeaderActions.displayName = "HeaderActions";
