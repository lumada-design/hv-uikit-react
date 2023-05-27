import styled from "@emotion/styled";
import { HvButton, HvButtonProps } from "@core/components";
import { forwardRef } from "react";
import { PolymorphicRef } from "@core/types";
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

export const StyledCollapseButton = styled(
  forwardRef((props: HvButtonProps, ref?: PolymorphicRef<"button">) => {
    return <HvButton {...props} ref={ref} />;
  })
)({
  marginLeft: "auto",

  [`&.${verticalNavigationHeaderClasses.minimized}`]: {
    marginLeft: 0,
  },
});
