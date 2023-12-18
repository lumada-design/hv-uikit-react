import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTreeView", {
  /** Applied to the root element */
  root: {
    padding: 0,
    margin: 0,
    listStyle: "none",
    outline: "none",
  },
});
