import { createClasses } from "@hitachivantara/uikit-react-utils";

export const { staticClasses, useClasses } = createClasses("HvCarouselSlide", {
  slide: {},
  image: {
    aspectRatio: "16/9",
    width: "100%",
    height: "100%",
  },
});
