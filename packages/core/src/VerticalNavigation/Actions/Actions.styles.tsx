import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationActions",
  {
    root: {
      display: "block",
      background: theme.colors.atmo1,
      marginTop: "auto",

      "& :not(:last-child)": {
        marginBottom: "8px",
      },
    },
    hide: {
      display: "none",
    },
  }
);
