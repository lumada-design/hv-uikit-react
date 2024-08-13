import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

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
  },
);
