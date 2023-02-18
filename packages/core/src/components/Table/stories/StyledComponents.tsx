import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginBottom: 40,
});

export const StyledCode = styled("code")({
  border: `1px solid ${theme.colors.atmo5}`,
  backgroundColor: theme.colors.atmo3,
  color: theme.colors.acce1,
  lineHeight: 1,
  margin: "0px 2px",
  padding: "3px 5px",
  whiteSpace: "nowrap",
  borderRadius: 3,
  fontSize: 13,
});

export const StyledLink = styled("a")({
  color: theme.colors.acce2,
  cursor: "pointer",
  fontWeight: 600,
});

export const StyledUl = styled("ul")({
  paddingLeft: 40,
});
