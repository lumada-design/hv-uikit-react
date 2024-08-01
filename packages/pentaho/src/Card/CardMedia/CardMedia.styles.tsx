import { createClasses } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvCardMedia", {
  root: {},
  image: {
    objectFit: "cover",
    width: "100%",
  },
});
