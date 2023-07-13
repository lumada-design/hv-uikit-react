import styled from "@emotion/styled";
import { forwardRef } from "react";
import { HvButton, HvButtonProps } from "@core/components/Button";
import { PolymorphicRef } from "@core/types/generic";

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
