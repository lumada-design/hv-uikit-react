import { createClasses } from "@hitachivantara/uikit-react-utils";

export const { staticClasses, useClasses } = createClasses("HvTabs", {
  root: {
    minHeight: 0,
  },
  indicator: {},
  scroller: {},
  flexContainer: {
    marginLeft: "3px",
  },
  floating: {},
});
