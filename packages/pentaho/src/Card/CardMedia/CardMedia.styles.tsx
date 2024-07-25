import { createClasses } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvCardMedia", {
  root: {
    marginTop: "calc(var(--card-padding) * -1)",
    marginRight: "calc(var(--card-padding) * -1)",
    marginLeft: "calc(var(--card-padding) * -1)",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    borderRadius: "var(--card-radius) var(--card-radius) 0 0",
  },
});
