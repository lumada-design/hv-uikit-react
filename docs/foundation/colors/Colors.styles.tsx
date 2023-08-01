import styled from "@emotion/styled";
import { HvTypography, theme } from "@hitachivantara/uikit-react-core";

export const StyledGroup = styled("div")({
  paddingBottom: theme.space.sm,
});

export const StyledGroupName = styled(HvTypography)({
  marginTop: theme.space.md,
  marginBottom: theme.space.sm,
});

export const StyledColors = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  flexDirection: "row",
});

export const StyledColorContainer = styled("div")({
  marginRight: theme.space.md,
  marginBottom: theme.space.md,
});

export const StyledColorSquare = styled("div")({
  width: 130,
  height: 130,
  border: `1px solid ${theme.colors.atmo4}`,
  marginBottom: theme.space.xs,
});

export const StyledColorName = styled("span")({
  display: "flex",
  alignItems: "baseline",
  flexDirection: "column",
});
