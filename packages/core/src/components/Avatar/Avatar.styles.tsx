import styled from "@emotion/styled";

import { Avatar as MuiAvatar } from "@mui/material";

import { transientOptions } from "@core/utils/transientOptions";
import { outlineStyles } from "@core/utils/focusUtils";

import { HvAvatarSize, HvAvatarVariant } from "./types";

const EXTRA_SMALL = { container: "32px", avatar: "24px" };
const SMALL = { container: "40px", avatar: "32px" };
const MEDIUM = { container: "48px", avatar: "40px" };
const LARGE = { container: "60px", avatar: "52px" };
const EXTRA_LARGE = { container: "96px", avatar: "88px" };

export const StyledContainer = styled("div")({
  "&:focus-visible": {
    ...outlineStyles,
    borderRadius: 0,
  },
});

export const StyledImg = styled("img")({
  width: "100%",
  height: "100%",
  textAlign: "center",
  // Handle non-square image. The property isn't supported by IE 11.
  objectFit: "cover",
  // Hide alt text.
  color: "transparent",
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000,
});

export const StyledStatus = styled(
  "div",
  transientOptions
)(
  ({
    $variant,
    $size,
  }: {
    $variant: HvAvatarVariant;
    $size: HvAvatarSize;
  }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    // variant
    ...($variant === "circular" && {
      borderRadius: "50%",
    }),
    // size
    ...($size === "xs" && {
      width: EXTRA_SMALL.container,
      height: EXTRA_SMALL.container,
    }),
    ...($size === "sm" && {
      width: SMALL.container,
      height: SMALL.container,
    }),
    ...($size === "md" && {
      width: MEDIUM.container,
      height: MEDIUM.container,
    }),
    ...($size === "lg" && {
      width: LARGE.container,
      height: LARGE.container,
    }),
    ...($size === "xl" && {
      width: EXTRA_LARGE.container,
      height: EXTRA_LARGE.container,
    }),
  })
);

export const StyledAvatar = styled(MuiAvatar)(
  ({ size }: { component: any; size: HvAvatarSize }) => ({
    // root
    fontSize: "1rem",
    // avatar
    ...(size === "xs" && {
      width: EXTRA_SMALL.avatar,
      height: EXTRA_SMALL.avatar,
      fontSize: "0.5rem",
    }),
    ...(size === "sm" && {
      width: SMALL.avatar,
      height: SMALL.avatar,
      fontSize: "0.625rem",
    }),
    ...(size === "md" && {
      width: MEDIUM.avatar,
      height: MEDIUM.avatar,
      fontSize: "1rem",
    }),
    ...(size === "lg" && {
      width: LARGE.avatar,
      height: LARGE.avatar,
      fontSize: "1.5rem",
    }),
    ...(size === "xl" && {
      width: EXTRA_LARGE.avatar,
      height: EXTRA_LARGE.avatar,
      fontSize: "2rem",
    }),
  })
);

export const StyledBadge = styled("div")({
  width: 8,
  height: 8,
  position: "absolute",
  top: 0,
  right: 0,
  borderRadius: "50%",
  zIndex: 1,
});
