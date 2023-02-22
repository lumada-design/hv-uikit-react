import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export const StyledRoot = styled("div")({
  width: "100%",
  height: "75px",
  padding: theme.space.sm,
  borderTop: `3px solid ${theme.colors.atmo2}`,
  display: "flex",
  justifyContent: "flex-end",
});
