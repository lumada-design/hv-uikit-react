import styled from "@emotion/styled";
import { Typography } from "@hitachivantara/uikit-core";
import { theme } from "@hitachivantara/uikit-styles";

export const StyledGroup = styled("div")({
  paddingBottom: theme.spacing(4),
  borderTop: `1px solid ${theme.colors.atmo4}`,
});

export const StyledGroupName = styled(Typography)({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
});

export const StyledColors = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  flexDirection: "row",
});

export const StyledColorContainer = styled("div")({
  marginRight: theme.spacing(3),
  marginBottom: theme.spacing(3),
});

export const StyledColorSquare = styled("div")({
  width: 130,
  height: 130,
  border: `1px solid ${theme.colors.atmo4}`,
  marginBottom: theme.spacing(1),
});

export const StyledColorName = styled("span")({
  display: "flex",
  alignItems: "baseline",
});
