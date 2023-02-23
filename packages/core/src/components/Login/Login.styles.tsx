import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export const StyledRoot = styled("div")({
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom",
  backgroundSize: "cover",
  width: "100%",
  height: "100%",
  padding: 0,
  margin: "-1px 0 0 0",
});

export const StyledFormContainer = styled("div")({
  background: theme.colors.atmo2,
  marginLeft: "auto",
  maxWidth: 500,
  height: "100%",
});
