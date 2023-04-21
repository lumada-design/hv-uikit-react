import styled from "@emotion/styled";
import { HvButton, HvButtonProps } from "@core/components";
import verticalNavigationHeaderClasses from "./headerClasses";
import { forwardRef, Ref } from "react";

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

export const StyledCollapseButton = styled(
  forwardRef((props: HvButtonProps, ref?: Ref<HTMLButtonElement>) => {
    return <HvButton {...props} ref={ref} />;
  })
)({
  marginLeft: "auto",

  [`&.${verticalNavigationHeaderClasses.minimized}`]: {
    marginLeft: 0,
  },
});
