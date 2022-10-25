import styled from "@emotion/styled";
import { themeUtils } from "theme";

export const Div = styled.div({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  "& > *": {
    marginLeft: themeUtils.space(1),
  },
});
