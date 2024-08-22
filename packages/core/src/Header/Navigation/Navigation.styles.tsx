import { createClasses } from "@hitachivantara/uikit-react-utils";

// TODO - rename to HvHeaderNavigation (the actual component's name) in v6
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
  },
);
