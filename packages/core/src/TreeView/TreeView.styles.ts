import { createClasses } from "@hitachivantara/uikit-react-utils";

export const { staticClasses, useClasses } = createClasses("HvTreeView", {
  /** Applied to the root element */
  root: {
    padding: 0,
    margin: 0,
    listStyle: "none",
    outline: "none",
  },
});
