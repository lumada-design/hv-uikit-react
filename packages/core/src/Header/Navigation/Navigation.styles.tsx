import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvHeader-Navigation",
  {
    root: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 1,
      top: "0px",
      left: "0px",
    },
  }
);
