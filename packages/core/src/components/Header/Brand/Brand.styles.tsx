import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";

export const BrandRoot = styled("div")({
  display: "flex",
  alignItems: "center",

  "&& svg": {
    "& path": {
      fill: theme.header.brandColor,
    },
    "& rect": {
      fill: theme.header.brandColor,
    },
  },
});

export const BrandSeparator = styled("div")({
  width: 1,
  height: theme.space.sm,
  margin: theme.space.xs,
  backgroundColor: theme.colors.acce1,
});

export const BrandName = styled((props) => <HvTypography {...props} />)({
  color: theme.header.brandColor,
});
