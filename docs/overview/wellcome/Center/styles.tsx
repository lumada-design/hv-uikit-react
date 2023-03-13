import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export const Wrapper = styled.div`
  background: ${theme.colors.atmo1};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
  p {
    width: 500px;
    max-width: 90%;
    font-size: 16px;
  }
`;

export const Separator = styled.div`
  width: 50px;
  border-bottom: 1px solid #414141;
  margin: 15px;
`;
