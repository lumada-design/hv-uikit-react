import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvCarouselSlide", {
  slide: {},
  image: {
    aspectRatio: "16/9",
    width: "100%",
    height: "100%",
  },
});
