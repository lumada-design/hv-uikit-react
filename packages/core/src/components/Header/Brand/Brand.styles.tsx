import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { forwardRef, Ref } from "react";
import { HvTypography, HvTypographyProps } from "~/components";

export const BrandRoot = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const BrandSeparator = styled("div")({
  width: 1,
  height: theme.space.sm,
  margin: theme.space.xs,
  backgroundColor: theme.colors.secondary,
});

export const BrandName = styled(
  forwardRef((props: HvTypographyProps, ref?: Ref<HTMLElement>) => {
    return <HvTypography {...props} ref={ref} />;
  })
)({
  color: theme.header.brandColor,
});
