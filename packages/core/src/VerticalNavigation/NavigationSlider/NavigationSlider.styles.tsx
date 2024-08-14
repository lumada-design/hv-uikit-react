import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationSlider",
  {
    root: {
      display: "flex",
      alignItems: "center",
      borderLeft: `4px solid transparent`,
      minHeight: "48px",
      marginBottom: "8px",
      "& > button": {
        marginLeft: "auto",
      },
    },
    listItemSelected: {
      background: theme.colors.atmo3,
      borderLeft: `4px solid ${theme.colors.secondary}`,
    },
    listItemFocus: {
      background: theme.colors.atmo3,
    },
    forwardButton: {},
    listContainer: {},
    listItemDisabled: {},
  },
);
