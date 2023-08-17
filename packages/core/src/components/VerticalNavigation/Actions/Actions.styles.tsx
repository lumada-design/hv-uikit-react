import { createClasses } from "@core/utils/classes";

import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationActions",
  {
    root: {
      display: "block",
      background: theme.colors.atmo1,
      marginTop: theme.verticalNavigation.actionsMarginTop,

      "& :not(:last-child)": {
        marginBottom: "8px",
      },
    },
    hide: {
      display: "none",
    },
  }
);
