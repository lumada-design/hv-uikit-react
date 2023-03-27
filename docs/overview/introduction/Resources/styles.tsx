import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 80px;
  gap: 15px;
  > div {
    height: 80px;
    width: 70px;
  }
  p {
    font-size: 14px;
    text-align: left;
  }
  h3 {
    font-size: 16px;
    font-weight: bold;
  }
`;
