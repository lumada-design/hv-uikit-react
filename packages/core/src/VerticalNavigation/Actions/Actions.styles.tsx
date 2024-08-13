import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

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
  },
);
