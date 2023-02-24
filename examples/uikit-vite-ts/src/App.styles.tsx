import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-react-core";

export const StyledContainer = styled("div")({
  height: "100vh",
  padding: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const StyledThemeSwitcherContainer = styled("div")({
  marginTop: theme.space.sm,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  rowGap: theme.space.xs,
});

export const StyledLink = styled("a")({
  fontWeight: theme.fontWeights.semibold,
});
