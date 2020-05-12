const SMALL = "24px";
const MEDIUM = "40px";
const LARGE = "96px";

const styles = {
  /* Styles applied to the root element. */
  root: {
    fontSize: "1rem"
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
    textIndent: 10000
  },
  /* Styles applied to the fallback icon */
  fallback: {},

  S: {
    width: SMALL,
    height: SMALL,
    fontSize: "0.625rem"
  },
  M: {
    width: MEDIUM,
    height: MEDIUM,
    fontSize: "1rem"
  },
  L: {
    width: LARGE,
    height: LARGE,
    fontSize: "2rem"
  }
};

export default styles;
