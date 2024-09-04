import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationAction",
  {
    action: {
      width: "100%",
      justifyContent: "flex-start",
      height: "32px",
      color: "inherit",
      fontWeight: "inherit",
      padding: 0,
      border: "none",

      // cursor
      "& *": {
        cursor: "pointer",
      },
    },
    noIcon: {
      paddingLeft: theme.space.xs,
    },
    minimized: {
      justifyContent: "center",
      paddingRight: 0,
    },
  },
);
