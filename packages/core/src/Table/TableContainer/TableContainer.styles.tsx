import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTableContainer", {
  root: {
    width: "100%",
    overflow: "auto",
    // extra padding to avoid cutting focus rings in the last line
    paddingBottom: 3,
  },
});
