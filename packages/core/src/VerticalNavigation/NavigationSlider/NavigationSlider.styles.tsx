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
      color: "inherit",
      marginBottom: "8px",
      "& > button": {
        marginLeft: "auto",
      },

      "& .HvListItem-startAdornment .color0": {
        fill: "currentColor",
      },
    },
    listItemSelected: {
      background: theme.colors.bgActive,
      borderLeft: `4px solid ${theme.colors.text}`,
    },
    listItemFocus: {
      background: theme.colors.bgActive,
    },
    forwardButton: {
      color: "inherit",
    },
    listContainer: {},
    listItemDisabled: {},
  },
);
