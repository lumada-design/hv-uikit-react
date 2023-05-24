import { CSSInterpolation } from "@emotion/css";
import { getClasses } from "@core/utils";

export type HvCarouselSlideClasses = Record<keyof typeof styles, string>;

const styles = {
  slide: {},
  image: {
    aspectRatio: "16/9",
    width: "100%",
    height: "100%",
  },
} satisfies Record<string, CSSInterpolation>;

export const cc = getClasses(
  Object.keys(styles) as (keyof HvCarouselSlideClasses)[],
  "HvCarouselSlide"
);

export default styles;
