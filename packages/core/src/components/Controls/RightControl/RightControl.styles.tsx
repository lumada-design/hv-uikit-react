import styled from "@emotion/styled";
import { HvDropdown } from "components";

export const StyledRoot = styled("div")({
  display: "inline-flex",
  gap: 10,
});

export const StyledDropdown = styled((props) => <HvDropdown {...props} />)({
  minWidth: 200,
});
