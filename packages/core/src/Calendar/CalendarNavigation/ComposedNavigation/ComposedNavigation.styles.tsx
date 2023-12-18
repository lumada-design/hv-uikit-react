import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../../utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvComposedNavigation",
  {
    navigationContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing("xs", 0),
    },
    navigationMonth: {
      minWidth: "160px",
    },
  }
);
