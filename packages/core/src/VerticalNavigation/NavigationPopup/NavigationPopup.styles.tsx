import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

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
