import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationTreeView",
  {
    root: {
      display: "block",
      background: theme.colors.atmo1,
      padding: `0px`,
      margin: "0",
      listStyle: "none",
      outline: "none",
    },
  },
);
