import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 270px;
  text-align: center;
  p {
    width: 500px;
    max-width: 90%;
    font-size: 16px;
    line-height: 1.7;
  }
`;

export const Separator = styled.div`
  width: 50px;
  border-bottom: 1px solid #414141;
  margin: 15px;
`;
