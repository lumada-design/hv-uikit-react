import styled from "@emotion/styled";
import { themeUtils } from "@hitachivantara/uikit-styles";

export const StyledDiv = styled.div({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  "& > *": {
    marginLeft: themeUtils.space(1),
  },
});
