import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

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
      backgroundColor: theme.colors.text,
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
