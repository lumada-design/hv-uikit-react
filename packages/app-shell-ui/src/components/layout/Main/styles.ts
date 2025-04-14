import styled from "@emotion/styled";

export const StyledContainer = styled.div({
  display: "flex",
  minHeight: "100vh",
  paddingTop: "var(--headerHeight)",
});

export const StyledMain = styled.main({
  flex: 1,
  width: "calc(100% - var(--vNavWidth))",
});
