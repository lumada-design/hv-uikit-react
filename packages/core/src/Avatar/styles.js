import { outlineStyles } from "../Focus/styles";

const EXTRA_SMALL = { container: "32px", avatar: "24px" };
const SMALL = { container: "40px", avatar: "32px" };
const MEDIUM = { container: "48px", avatar: "40px" };
const LARGE = { container: "60px", avatar: "52px" };
const EXTRA_LARGE = { container: "96px", avatar: "88px" };

const styles = {
  /* Styles applied to the root element. */
  root: {
    fontSize: "1rem",
  },
  /* Styles applied to the img element if either `src` or `srcSet` is defined. */
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
  /* Styles applied to the fallback icon */
  fallback: {},

  container: {
    "&:focus-visible": {
      ...outlineStyles,
      borderRadius: 0,
    },
  },
  status: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    "&$XS": {
      width: EXTRA_SMALL.container,
      height: EXTRA_SMALL.container,
    },
    "&$SM": {
      width: SMALL.container,
      height: SMALL.container,
    },
    "&$MD": {
      width: MEDIUM.container,
      height: MEDIUM.container,
    },
    "&$LG": {
      width: LARGE.container,
      height: LARGE.container,
    },
    "&$XL": {
      width: EXTRA_LARGE.container,
      height: EXTRA_LARGE.container,
    },
  },
  avatar: {
    "&$XS": {
      width: EXTRA_SMALL.avatar,
      height: EXTRA_SMALL.avatar,
      fontSize: "0.5rem",
    },
    "&$SM": {
      width: SMALL.avatar,
      height: SMALL.avatar,
      fontSize: "0.625rem",
    },
    "&$MD": {
      width: MEDIUM.avatar,
      height: MEDIUM.avatar,
      fontSize: "1rem",
    },
    "&$LG": {
      width: LARGE.avatar,
      height: LARGE.avatar,
      fontSize: "1.5rem",
    },
    "&$XL": {
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
    borderRadius: "50%",
    zIndex: 1,
  },

  XS: {},
  SM: {},
  MD: {},
  LG: {},
  XL: {},
  circular: {
    borderRadius: "50%",
  },
};

export default styles;
