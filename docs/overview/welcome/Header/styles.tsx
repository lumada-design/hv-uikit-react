import styled from "@emotion/styled";

export const BackgroundWrapper = styled.div`
  min-height: calc((100vh - 72px) * 0.3034);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  @media (max-width: 600px) {
    background-image: none !important;
  }
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  padding: 20px 4%;
`;

export const ContentWrapper = styled.div`
  padding: 120px 0;
  h3 {
    margin-top: 15px;
    margin-bottom: 25px;
  }
`;
