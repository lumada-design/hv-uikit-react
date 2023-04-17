import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Ref, forwardRef } from "react";
import { HvTypography, HvTypographyProps } from "~/components";

export const StyledRoot = styled("nav")({
  display: "flex",
  alignItems: "center",
  zIndex: 0,
});

export const StyledOrderedList = styled("ol")({
  display: "flex",
  paddingLeft: 0,
  marginLeft: `-${theme.space.xs}`,
});

export const StyledTypography = styled(
  forwardRef((props: HvTypographyProps, ref?: Ref<HTMLElement>) => {
    return <HvTypography {...props} ref={ref} />;
  })
)({
  padding: `8px ${theme.space.xs}`,
});
