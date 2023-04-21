import styled from "@emotion/styled";
import { HvDropdown, HvDropdownProps } from "@core/components";

export const StyledRoot = styled("div")({
  display: "inline-flex",
  gap: 10,
});

export const StyledDropdown = styled((props: HvDropdownProps) => (
  <HvDropdown {...props} />
))({
  minWidth: 200,
});
