import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvListContainer", {
  root: {
    overflow: "clip",
    overflowClipMargin: 4,
  },
});
