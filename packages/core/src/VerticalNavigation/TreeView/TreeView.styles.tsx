import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

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
