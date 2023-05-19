import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvCarouselSlideClasses = Record<keyof typeof styles, string>;

const styles = {
  slide: {},
  image: {
    aspectRatio: "16/9",
    width: "100%",
    height: "100%",
  },
};

const name = "HvCarouselSlide";

export const cc = getClasses(
  Object.keys(styles) as (keyof HvCarouselSlideClasses)[],
  name
);

export default styles;
