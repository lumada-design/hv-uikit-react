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
      padding: theme.spacing(0, "xs"),
      border: "none",

      // cursor
      "& *": {
        cursor: "pointer",
      },
    },
    noIcon: {},
    minimized: {
      justifyContent: "center",
      padding: 0,
    },
  },
);
