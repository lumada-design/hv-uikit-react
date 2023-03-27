import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  h3 {
    margin: 20px auto;
    max-width: 1000px;
  }
  body {
    margin-top: 16px;
    margin-bottom: 26px;
  }
`;

export const GridElement = styled.div`
  minheight: 50px;
  padding: 35px;
`;

export const GridGroup = styled.div`
  display: inline-flex;

  div {
    margin-top: 15px;
    margin-right: 10px;
    border: 1px solid;
  }
`;

export const Separator = styled.hr`
  width: 30px;
  height: 1px;
  background-color: gray;
  margin-bottom: 15px;
`;
