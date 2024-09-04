import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationActions",
  {
    root: {
      display: "flex",
      flexDirection: "column",
      marginTop: "auto",

      gap: theme.space.xs,
    },
    hide: {
      display: "none",
    },
  },
);
