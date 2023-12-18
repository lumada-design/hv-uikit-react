import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTabs", {
  root: {
    minHeight: 0,
    overflow: "visible",
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      width: "100%",
      backgroundColor: `${theme.colors.secondary}`,
    },
    height: 2,
  },
  scroller: {
    overflow: "visible !important",
  },
  flexContainer: {
    "& button:first-of-type": {
      marginLeft: "3px",
    },
  },
});
