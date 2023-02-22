import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export const StyledDiv = styled.div({
  backgroundColor: "transparent",
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  "& > *": {
    marginLeft: theme.space.xs,
  },
});
