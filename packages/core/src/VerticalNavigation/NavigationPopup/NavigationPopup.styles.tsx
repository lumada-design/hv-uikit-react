import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationPopup",
  {
    popup: {},
    container: {
      marginLeft: theme.spacing("xs"),
    },
    popper: {
      zIndex: theme.zIndices.popover,
    },
  },
);
