import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "@core/components";

export const StyledIconContainer = styled("div")({
  marginRight: theme.space.xs,
  marginLeft: -theme.space.xs,
});

export const StyledTypography = styled(HvTypography)({
  color: theme.colors.base_dark,
  wordBreak: "break-word",
  maxWidth: "700px",
  overflow: "hidden",
  marginRight: 10,
});

export const StyledMessageContainer = styled("div")({
  flex: "0 0 auto",
});
