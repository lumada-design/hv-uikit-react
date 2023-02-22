import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export const BrandRoot = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const BrandSeparator = styled("div")({
  width: 1,
  height: theme.space.sm,
  margin: theme.space.xs,
  backgroundColor: theme.colors.acce1,
});
