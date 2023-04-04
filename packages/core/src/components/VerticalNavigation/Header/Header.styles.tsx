import styled from "@emotion/styled";
import { HvButton, HvButtonProps } from "~/components";
import verticalNavigationHeaderClasses from "./headerClasses";

export const StyledHeader = styled("div")({
  width: "100%",
  display: "flex",
  marginTop: "12px",
  alignItems: "center",

  [`&.${verticalNavigationHeaderClasses.minimized}`]: {
    justifyContent: "center",
    paddingRight: 0,
  },
});

export const StyledCollapseButton = styled((props: HvButtonProps) => (
  <HvButton {...props} />
))({
  marginLeft: "auto",

  [`&.${verticalNavigationHeaderClasses.minimized}`]: {
    marginLeft: 0,
  },
});
