import { CSSProperties } from "react";
import { CSSInterpolation } from "@emotion/css";
import { getClasses } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";
import { replace$ } from "./utils";

export type HvCarouselClasses = Record<keyof typeof styles, string>;

const styles = {
  /** Styles applied to the component root class. */
  root: {
    display: "flex",
    alignItems: "stretch",
    flexDirection: "column",
    backgroundColor: theme.colors.atmo1,
    margin: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  xs: {
    // increase specificity
    "&:not(._)": {
      padding: 0,
    },
    // put dots on top of Slide
    "& $dots": {
      position: "relative",
      top: "-40px",
    },
    "& $actions": {
      top: 0,
    },
    "& $controls": {
      display: theme.carousel.xsControlsDisplay,
    },
  },
  fullscreen: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    inset: 0,
    zIndex: theme.zIndices.modal,
    // increase specificity
    "&:not(._)": {
      padding: theme.spacing(["xs", "xl"]),
    },
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: theme.space.xs,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    height: 0,
    zIndex: 1,

    position: "relative",
    top: theme.carousel.actionsOffsetTop,
  },
  closeButton: {},

  mainContainer: {
    display: "flex",
    flexDirection: theme.carousel
      .mainContainerFlexDirection as CSSProperties["flexDirection"],
  },

  controls: {
    display: "flex",
    alignItems: "center",
    height: 32,
    justifyContent: theme.carousel.controlsJustifyContent,
    backgroundColor: theme.carousel.controlsBackgroundColor,
    border: theme.carousel.controlsBorder,
    gap: theme.space.xs,
    "&:has($dots)": {
      justifyContent: "center",
    },
  },
  pageCounter: {},

  main: {
    padding: 0,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    "&:hover $slideControls": {
      opacity: 1,
    },
  },
  mainXs: {},
  mainFullscreen: {
    maxHeight: "80vh",
  },
  counterContainer: {
    position: "absolute",
    top: theme.space.xs,
    right: theme.space.md,
    zIndex: 1,
    display: theme.carousel.counterContainerDisplay,
  },
  counter: {
    color: theme.colors.base_light,
    backgroundColor: theme.colors.base_dark,
    padding: theme.spacing([0, "sm"]),
  },
  slideControls: {
    position: "absolute",
    left: 0,
    right: 0,
    top: `calc(50% - (32px / 2))`,
    padding: theme.spacing([0, "sm"]),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    opacity: 0,
    "& button": {
      zIndex: 1,
    },
    "&:focus-within": {
      opacity: 1,
    },
  },
  slidesViewport: {
    overflow: "hidden",
  },
  slidesContainer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },

  dots: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space.xs,
    height: theme.space.md,
  },
  dotsXs: {},
  dot: {
    width: 5,
    height: 5,
    margin: theme.space.xs,
    borderRadius: "50%",
    backgroundColor: theme.colors.atmo4,
  },
  dotSelected: {
    width: 10,
    height: 10,
    backgroundColor: theme.colors.secondary_80,
  },

  panel: {
    display: "flex",
    width: "100%",
    overflowX: "auto", // "hidden",
    overflowY: "hidden",
    padding: theme.spacing(["xs", "2px", "2px"]),
  },
  thumbnail: {
    height: "unset",
    padding: 0,
    "& img": {
      width: "100%",
      height: "100%",
      textAlign: "center",
      aspectRatio: "16/9",
      opacity: "50%",
      borderRadius: theme.carousel.thumbnailBorderRadius,
    },
  },
  thumbnailSelected: {
    "& img": {
      border: theme.carousel.thumbnailSelectedBorder,
      opacity: "100%",
    },
  },
} satisfies Record<string, CSSInterpolation>;

const name = "HvCarousel";

export const carouselClasses = getClasses(
  Object.keys(styles) as (keyof HvCarouselClasses)[],
  name
);

const newStyles = replace$(styles, name);

export default newStyles;
