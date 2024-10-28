import { createClasses } from "@hitachivantara/uikit-react-utils";

export const { staticClasses, useClasses } = createClasses("HvTabs", {
  root: {
    minHeight: 0,
    overflow: "visible",
  },
  indicator: {},
  scroller: {
    overflow: "visible !important",
  },
  flexContainer: {
    marginLeft: "3px",
  },
  floating: {},
});
