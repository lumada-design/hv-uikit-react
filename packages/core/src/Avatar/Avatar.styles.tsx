import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

const EXTRA_SMALL = { container: "32px", avatar: "24px" };
const SMALL = { container: "40px", avatar: "32px" };
const MEDIUM = { container: "48px", avatar: "40px" };
const LARGE = { container: "60px", avatar: "52px" };
const EXTRA_LARGE = { container: "96px", avatar: "88px" };

export const { staticClasses, useClasses } = createClasses("HvAvatar", {
  root: {
    fontSize: "1rem",
  },
  container: {
    "&:focus-visible": {
      ...outlineStyles,
      borderRadius: 0,
    },
  },
  img: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    // Handle non-square image. The property isn't supported by IE 11.
    objectFit: "cover",
    // Hide alt text.
    color: "transparent",
    // Hide the image broken icon, only works on Chrome.
    textIndent: 10000,
  },
  fallback: {},
  status: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    "&$xs": { width: EXTRA_SMALL.container, height: EXTRA_SMALL.container },
    "&$sm": { width: SMALL.container, height: SMALL.container },
    "&$md": { width: MEDIUM.container, height: MEDIUM.container },
    "&$lg": { width: LARGE.container, height: LARGE.container },
    "&$xl": { width: EXTRA_LARGE.container, height: EXTRA_LARGE.container },
  },
  avatar: {
    "&$xs": {
      width: EXTRA_SMALL.avatar,
      height: EXTRA_SMALL.avatar,
      fontSize: "0.5rem",
    },
    "&$sm": { width: SMALL.avatar, height: SMALL.avatar, fontSize: "0.625rem" },
    "&$md": { width: MEDIUM.avatar, height: MEDIUM.avatar, fontSize: "1rem" },
    "&$lg": { width: LARGE.avatar, height: LARGE.avatar, fontSize: "1.5rem" },
    "&$xl": {
      width: EXTRA_LARGE.avatar,
      height: EXTRA_LARGE.avatar,
      fontSize: "2rem",
    },
  },
  badge: {
    width: 8,
    height: 8,
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: theme.radii.full,
    zIndex: 1,
  },
  xs: {},
  sm: {},
  md: {},
  lg: {},
  xl: {},
  circular: { borderRadius: theme.radii.full },
  square: {},
});
