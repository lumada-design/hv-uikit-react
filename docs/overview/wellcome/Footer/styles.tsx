import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export const Wrapper = styled.div`
  background: ${theme.colors.atmo1};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

export const Separator = styled.div`
  width: 50px;
  border-bottom: 1px solid #414141;
  margin-bottom: 20px;
`;
