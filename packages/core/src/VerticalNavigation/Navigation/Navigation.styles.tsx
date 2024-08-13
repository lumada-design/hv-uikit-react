import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationTree",
  {
    root: {
      display: "block",
      background: theme.colors.atmo1,

      overflowY: "auto",
    },
    list: {},
    listItem: {},
    collapsed: {
      display: "none",
    },
    popup: {
      boxShadow: "inset 5px 0 5px -3px rgb(65 65 65 / 12%)",
    },
    navigationPopup: {
      boxShadow: "inset 5px 0 5px -3px rgb(65 65 65 / 12%)",
    },
  },
);
